---
title: Mod Structure Basics
parent: For Developers
---

# Project Folder Guide
Understanding the role of each folder prevents confusion and keeps your mod organized.

## `Plugin.cs`
**What this is:** The BepInEx entry point. Every mod has exactly one.

The class decorated with `[BepInPlugin]` is what BepInEx finds and loads. It overrides `Load()` which is called once at startup. This is where you wire everything together: Harmony patches, VCF registration, config file setup.

```csharp
[BepInPlugin(MyPluginInfo.PLUGIN_GUID, MyPluginInfo.PLUGIN_NAME, MyPluginInfo.PLUGIN_VERSION)]
[BepInDependency("gg.deca.VampireCommandFramework")]
public class Plugin : BasePlugin
{
    internal static Plugin Instance { get; private set; }
    internal static Harmony Harmony { get; } = new(MyPluginInfo.PLUGIN_GUID);

    public override void Load()
    {
        Instance = this;

        // Apply all [HarmonyPatch] classes in this assembly
        Harmony.PatchAll(Assembly.GetExecutingAssembly());

        // Register all [Command] classes and [CommandConverter] classes
        CommandRegistry.RegisterAll();

        Log.LogInfo($"{MyPluginInfo.PLUGIN_NAME} loaded.");
    }

    public override bool Unload()
    {
        CommandRegistry.UnregisterAssembly();
        Harmony.UnpatchSelf();
        return true;
    }
}
```

Keep `Plugin.cs` thin. It initialises the framework; it does not contain business logic.

## `Core.cs`
**What this is:** The static service locator for your mod. Referenced everywhere.

`Core` is a static class that holds references to game systems and your own services after the world has loaded. It exposes them as static properties so commands and patches can reach them without passing instances around.

It also owns `InitializeAfterLoaded()`, which is called once by a one-shot Harmony patch when the server finishes booting. This is the earliest safe moment to access game systems.

```csharp
internal static class Core
{
    public static World Server { get; } = GetWorld("Server")
        ?? throw new Exception("Server world not found.");

    public static EntityManager EntityManager { get; } = Server.EntityManager;

    // Game systems, resolved once in InitializeAfterLoaded()
    public static PrefabCollectionSystem PrefabCollectionSystem { get; internal set; }
    public static GameDataSystem GameDataSystem { get; internal set; }

    // Your own services
    public static PlayerService Players { get; internal set; }

    internal static void InitializeAfterLoaded()
    {
        // Called once after the server world is ready.
        PrefabCollectionSystem = Server.GetExistingSystemManaged<PrefabCollectionSystem>();
        GameDataSystem = Server.GetExistingSystemManaged<GameDataSystem>();

        Players = new PlayerService();

        Plugin.Instance.Log.LogInfo("Core initialised.");
    }

    static World GetWorld(string name)
        => World.s_AllWorlds.ToArray().FirstOrDefault(w => w.Name == name);
}
```

The one-shot init patch that calls this typically lives in `Patches/` and looks like:

```csharp
[HarmonyPatch(typeof(ServerBootstrapSystem), nameof(ServerBootstrapSystem.OnUserConnected))]
static class InitializationPatch
{
    static bool _initialized = false;

    [HarmonyPostfix]
    static void OneShot_AfterLoad(ServerBootstrapSystem __instance)
    {
        if (_initialized) return;
        _initialized = true;
        Core.InitializeAfterLoaded();
    }
}
```

This pattern ensures services are only set up once and only after the game is ready for them.

## `Commands/`
**What goes here:** Your chat command classes: the things players type in chat.

Commands are the primary interface between your mod and players. Each command class is decorated with `[CommandGroup]` and each method inside with `[Command]`. VCF automatically registers these through `CommandRegistry.RegisterAll()` in `Plugin.cs`.

```csharp
[CommandGroup("mymod", "mm")]          // players type .mymod or .mm
internal static class MyCommands
{
    [Command("heal", adminOnly: true)]  // players type .mymod heal
    public static void HealCommand(ChatCommandContext ctx)
    {
        // ctx.Event.SenderCharacterEntity = their character
        // ctx.Reply("message") = sends them a chat reply
    }
}
```

**Rules:**
- Methods must be `public static void`
- First parameter must be `ChatCommandContext ctx` (not `ICommandContext`)
- Parameters after `ctx` become the command's arguments (VCF handles parsing)
- A parameter named `string _remainder` captures everything to end-of-line

## `Converters/`
**What goes here:** Custom argument parsers that let VCF understand non-primitive types.

When a command takes a `FoundPlayer` or `FoundItem` parameter, VCF doesn't know how to turn the raw chat string into that type. A converter teaches it. The converter receives the raw string and returns your custom type (or throws `ctx.Error(...)` to show a user-friendly error message).

```csharp
// 1. Define a record wrapper for your type:
public record FoundPlayer(PlayerData Value);
// 2. Write the converter:
internal class FoundPlayerConverter : CommandArgumentConverter<FoundPlayer>
{
    public override FoundPlayer Parse(ICommandContext ctx, string input)
    {
        if (Core.Players.TryFindName(input, out var data))
            return new FoundPlayer(data);
        throw ctx.Error($"Player '{input}' not found.");
    }
}
```

VCF auto-discovers converters at startup via `CommandRegistry.RegisterAll()`.
Once registered, any `[Command]` method with a `FoundPlayer` parameter just works.

**When to create a converter:**
- You have a command that takes a player/item/prefab by name
- Multiple commands need the same lookup logic (DRY principle)
- You want a clean error message instead of a raw exception

## `Services/`
**What goes here:** The business logic layer: classes that do the actual work.

Services encapsulate ECS queries and game interactions so your commands stay thin. Instead of writing 50 lines of ECS in a command method, you call `Core.Players.TryFindName(...)`. A service owns the EntityQuery, the cache, and the logic.

```csharp
// Core.cs exposes services as static properties:
public static PlayerService Players { get; internal set; }
// Commands call services cleanly:
[Command("kick")]
public static void KickCommand(ChatCommandContext ctx, FoundPlayer target)
{
    Core.KickService.KickPlayer(target.Value.UserEntity);
    ctx.Reply($"Kicked {target.Value.CharacterName}");
}
```

**Key rules:**
- Services are instantiated in `Core.InitializeAfterLoaded()`, not in their constructor (world may not be ready yet)
- Constructor creates EntityQueries and reads prefabs
- Methods do the actual ECS reads/writes
- Never put ECS logic directly in command methods

## `Patches/`
**What goes here:** Harmony patches: code that hooks into existing game methods.

Harmony lets you inject code before (Prefix) or after (Postfix) any game method without modifying game files. This is how you react to game events that VCF doesn't expose (player death, item pickup, structure built, etc.).

```csharp
// Run code AFTER an existing game method completes:
[HarmonyPatch(typeof(ServerBootstrapSystem), nameof(ServerBootstrapSystem.OnUserConnected))]
public static class PlayerConnectPatch
{
    [HarmonyPostfix]
    public static void Postfix(ServerBootstrapSystem __instance, NetConnectionId netConnectionId)
    {
        // Called every time a player connects.
        // Update your service cache here.
        var userIndex = __instance._NetEndPointToApprovedUserIndex[netConnectionId];
        var serverClient = __instance._ApprovedUsersLookup[userIndex];
        Core.Players.UpdatePlayerCache(serverClient.UserEntity, ...);
    }
}
```

**Patch types:**
- `[HarmonyPrefix]`: runs before the original method.
- `[HarmonyPostfix]`: runs after the original. Use `__result` to read/modify the return value.

**Special: one-shot init patch** (`InitializationPatch.cs`)
Runs once when the game world finishes loading, calls `Core.InitializeAfterLoaded()`, then removes itself so it never runs again.

**All patches are applied automatically** via `_harmony.PatchAll(Assembly.GetExecutingAssembly())` in `Plugin.Load()`.

## `Models/`
**What goes here:** Plain data structures: enums, records, and structs.

No ECS logic. No game calls. Just data. Models are shared between commands, services, and converters.

- `GameModels.cs`: Enums your commands expose to players (e.g. `PlayerClass`, `ItemRarity`)
- `PlayerData.cs`: The player snapshot struct (cached identity + live extension methods)

## `Middleware/`
**What goes here:** Cross-cutting logic that runs around every command.

VCF middleware intercepts all command executions. You get three hooks:
- `CanExecute`: called before the command; return `false` to block it
- `BeforeExecute`: runs right before (after permission checks pass)
- `AfterExecute`: runs after successful completion

Use middleware for: cooldown systems, logging, role-based permissions (like VRoles), feature toggles.

```csharp
public class CooldownMiddleware : CommandMiddleware
{
    public override bool CanExecute(ICommandContext ctx, CommandAttribute cmd, MethodInfo m)
    {
        if (OnCooldown(ctx.Name, cmd.Id)) { ctx.Reply("Wait!"); return false; }
        return true;
    }
}
```

Register in `Plugin.Load()` **before** `CommandRegistry.RegisterAll()`:
```csharp
CommandRegistry.Middlewares.Add(new CooldownMiddleware());
CommandRegistry.RegisterAll();
```

## `Data/`
**What goes here:** Static data: `PrefabGUID` constants and embedded JSON files.

`Prefabs.cs` holds named constants for common game object GUIDs. Instead of scattering raw integers across your code, reference them by name:

```csharp
ApplyBuff(entity, Prefabs.Admin_Invulnerable_Buff);  // clear intent
ApplyBuff(entity, new PrefabGUID(-480024072));        // cryptic
```

For embedded JSON (localization, prefab name maps), add files to the `.csproj` as `<EmbeddedResource>` and load them with `Assembly.GetManifestResourceStream(...)`.

## `Utilities/`
**What goes here:** Stateless helper methods and extension methods that don't belong to any one service.

Similar to `Services/`, but where services own state and queries, utilities are pure functions with no dependencies on game state. Think: math helpers, string formatters, entity extension methods, bit manipulation.

```csharp
public static class EntityExtensions
{
    public static bool Has<T>(this Entity entity) where T : struct
        => Core.EntityManager.HasComponent<T>(entity);

    public static T Read<T>(this Entity entity) where T : struct
        => Core.EntityManager.GetComponentData<T>(entity);
}
```

If a helper needs `EntityManager` or a cached query, it belongs in `Services/`. If it's a pure function or extension that works on any input, `Utilities/` is the right home.

## `Systems/`
**What goes here:** Custom ECS systems that run on a schedule, not in response to a command or patch.

The game engine processes `ComponentSystem` and `JobComponentSystem` classes automatically each frame (or on a fixed schedule). You can inject your own systems to run logic continuously, watch for entity changes, or drive ongoing effects.

This is distinct from `Services/` (called on demand) and `Patches/` (triggered by hooking a specific method). Systems run passively on every update tick until disabled.

```csharp
[BepInEx.Logging.BepInPlugin(...)]
public partial class PlayerTrackingSystem : SystemBase
{
    protected override void OnUpdate()
    {
        // Runs every frame. Query entities, update caches, drive effects.
        Entities.WithAll<PlayerCharacter>().ForEach((Entity e, in Translation t) =>
        {
            Core.PositionCache.Update(e, t.Value);
        }).Run();
    }
}
```

Use sparingly. A system that runs every frame has a cost. Prefer patches or service calls for event-driven logic.

## `Factories/`
**What goes here:** Classes responsible for constructing complex objects or entities.

Factories centralise the logic for creating something that requires multiple steps: spawning an entity with a specific set of components, building a data structure from raw inputs, or assembling a prefab with overrides. Instead of duplicating that setup across commands and services, one factory owns it.

```csharp
public static class BuffFactory
{
    public static void ApplyBuff(Entity target, PrefabGUID buffGuid, float duration)
    {
        var buffEntity = Core.EntityManager.Instantiate(Core.PrefabCollectionSystem._PrefabGuidToEntityMap[buffGuid]);
        // set duration, owner, etc.
    }
}
```

If you only create one type of thing in one place, a factory is overkill. They earn their keep when the same construction logic is needed in multiple commands or services.

## `Interfaces/`
**What goes here:** C# interface definitions that define contracts between parts of your mod.

Interfaces decouple components so they can be swapped or tested independently. In small mods they are rarely necessary, but as a mod grows they help: a `IPlayerRepository` interface lets your commands stay independent of whether player data comes from memory, a file, or a remote source.

Note that VCF already uses interfaces heavily (`ICommandContext`, `CommandArgumentConverter<T>`). Your custom interfaces follow the same pattern.

```csharp
public interface IPlayerRepository
{
    bool TryFind(string name, out PlayerData player);
    IEnumerable<PlayerData> GetAll();
}

// Concrete implementation in Services/:
public class PlayerService : IPlayerRepository { ... }
```

Most mods won't need a dedicated `Interfaces/` folder. It becomes useful when you want other mods to depend on your API, or when you have multiple implementations of the same concept (e.g. different storage backends).
