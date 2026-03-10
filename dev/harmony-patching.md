---
title: Hooking Systems with Harmony
parent: For Developers
---

# Hooking Systems with Harmony in V Rising

Harmony is the patching library that lets you run your own code before or after any game method without modifying the original assembly. It works by injecting managed delegates at runtime. Most V Rising mods use it heavily to intercept ECS system updates.

<span style="color: var(--vp-c-text-3); font-size: 0.85em;">Code examples adapted from [KindredCommands](https://github.com/Odjit/KindredCommands) · [AGPL-3.0](https://github.com/Odjit/KindredCommands/blob/main/LICENSE.txt)</span>

## How Harmony Works

You register a **patch class** that targets a specific method. Harmony rewrites that method at runtime to call your code before (`Prefix`) or after (`Postfix`) the original runs.

In your plugin, you apply all patches at startup:

```csharp
public static Harmony Harmony;

public void Awake()
{
    Harmony = new Harmony(MyPluginInfo.PLUGIN_GUID);
    Harmony.PatchAll(Assembly.GetExecutingAssembly());
}
```

Everything in the assembly decorated with `[HarmonyPatch]` gets applied automatically.

## Prefix vs Postfix

**Prefix** runs before the original method. Use it to read data before the system processes it, or to block the original from running at all.

**Postfix** runs after the original method completes. Use it when you need to react to what the system just did.

```csharp
[HarmonyPatch(typeof(BuffSystem_Spawn_Server), nameof(BuffSystem_Spawn_Server.OnUpdate))]
public static class BuffSystem_Spawn_ServerPatch
{
    public static void Prefix(BuffSystem_Spawn_Server __instance)
    {
        // runs before BuffSystem_Spawn_Server.OnUpdate
    }
}
```

```csharp
[HarmonyPatch(typeof(ServerBootstrapSystem), nameof(ServerBootstrapSystem.OnUserConnected))]
public static class OnUserConnected_Patch
{
    public static void Postfix(ServerBootstrapSystem __instance, NetConnectionId netConnectionId)
    {
        // runs after OnUserConnected completes
        // same parameter names as the original method
    }
}
```

`__instance` is always the system instance. Parameters match the original method by name.

## Accessing System Queries

ECS systems store their `EntityQuery` objects as private fields. You can access them directly on `__instance` by matching the field name exactly as it appears in ILSpy. The [Entity Query Descriptions](/dev/query-descriptions) reference lists every query field name and its component filters for every game system.

```csharp
[HarmonyPatch(typeof(UpdateBuffsBuffer_Destroy), nameof(UpdateBuffsBuffer_Destroy.OnUpdate))]
internal class UpdateBuffsBuffer_DestroyPatch
{
    public static void Prefix(UpdateBuffsBuffer_Destroy __instance)
    {
        var entities = __instance.__query_401358720_0.ToEntityArray(Allocator.Temp);
        foreach (var entity in entities)
        {
            var prefabGUID = entity.Read<PrefabGUID>();
            if (prefabGUID != Prefabs.EquipBuff_ShroudOfTheForest) continue;

            var attach = entity.Read<Attach>();
            if (attach.Parent != Entity.Null)
                Core.BoostedPlayerService.HandleShroudRemoval(attach.Parent);
        }
        entities.Dispose();
    }
}
```

::: warning Always Dispose NativeArrays
`ToEntityArray(Allocator.Temp)` allocates unmanaged memory. If you forget to call `.Dispose()` you will leak memory every frame. Use `try/finally` when there is any risk of an early return or exception.
:::

```csharp
var entities = __instance._EventQuery.ToEntityArray(Allocator.Temp);
try
{
    foreach (var entity in entities)
    {
        // process
    }
}
finally
{
    entities.Dispose();
}
```

## Targeting IL2CPP Methods

V Rising uses IL2CPP, so the interop assemblies you browse in ILSpy are generated wrappers. Harmony patches these wrappers directly. The method you patch is the managed entry point, and Harmony handles the rest.

If you are patching a method that is not named `OnUpdate`, you can still target it using `nameof`:

```csharp
[HarmonyPatch(typeof(DropInventorySystem), nameof(DropInventorySystem.DropItem))]
internal class DropInventorySystemPatch
{
    public static void Prefix(DropInventorySystem __instance,
        EntityCommandBuffer commandBuffer,
        [In] ref Translation translation,
        PrefabGUID itemHash,
        int amount,
        Entity itemEntity)
    {
        Core.Log.LogInfo($"Dropping {itemHash.LookupName()} at {translation.Value}");
    }
}
```

Match parameter names to the original method signature. For `ref` and `out` parameters, include the modifier. For IL2CPP blittable structs passed as `[In] ref`, add `[In]` explicitly.

If a method has overloads, use a `HarmonyPatch` with a `Type[]` argument to disambiguate:

```csharp
[HarmonyPatch(typeof(SomeSystem), nameof(SomeSystem.OverloadedMethod), new Type[] { typeof(Entity), typeof(float) })]
```

## Canceling the Original Method

Harmony supports returning `bool` from a Prefix to skip the original method, but **this approach is unreliable in V Rising**. IL2CPP's interop layer means the bool return does not always propagate correctly, and the original may still run. Don't rely on it.

The preferred approach is to destroy the relevant event entity before the system processes it, covered in the next section.

## Canceling by Destroying Events

A safer way to block specific events is to destroy the event entity before the system processes it. ECS events are typically single-frame entities, so destroying them mid-prefix is clean:

```csharp
[HarmonyPatch(typeof(BloodAltarSystem_StartTrackVBloodUnit_System_V2),
    nameof(BloodAltarSystem_StartTrackVBloodUnit_System_V2.OnUpdate))]
public static class BossTrackingPatch
{
    public static void Prefix(BloodAltarSystem_StartTrackVBloodUnit_System_V2 __instance)
    {
        foreach (var entity in __instance._EventQuery.ToEntityArray(Allocator.Temp))
        {
            var huntTarget = entity.Read<StartTrackVBloodUnitEventV2>().HuntTarget;
            var fromCharacter = entity.Read<FromCharacter>();

            if (Core.Boss.IsBossLocked(huntTarget))
            {
                ServerChatUtils.SendSystemMessageToClient(
                    Core.EntityManager, fromCharacter.User.Read<User>(), "This boss is locked.");
                Core.EntityManager.DestroyEntity(entity);
            }
        }
    }
}
```

This lets the system run normally for every other event. Only the blocked entity is removed.

## Both Prefix and Postfix Together

You can put both in the same class. This is useful when you need to bracket the system's work:

```csharp
[HarmonyPatch(typeof(AbilityRunScriptsSystem), nameof(AbilityRunScriptsSystem.OnUpdate))]
internal class AbilityRunScriptsSystemPatch
{
    public static void Prefix(AbilityRunScriptsSystem __instance)
    {
        var entities = __instance._OnCastStartedQuery.ToEntityArray(Allocator.Temp);
        foreach (var entity in entities)
        {
            var acse = entity.Read<AbilityCastStartedEvent>();
            if (acse.Ability.Read<PrefabGUID>() == Prefabs.AB_Shapeshift_Bat_TakeFlight_Cast)
                Core.GearService.SetShardsRestricted(false); // temporarily open before system runs
        }
        entities.Dispose();
    }

    public static void Postfix(AbilityRunScriptsSystem __instance)
    {
        var entities = __instance._OnCastStartedQuery.ToEntityArray(Allocator.Temp);
        foreach (var entity in entities)
        {
            var acse = entity.Read<AbilityCastStartedEvent>();
            if (acse.Ability.Read<PrefabGUID>() == Prefabs.AB_Shapeshift_Bat_TakeFlight_Cast)
                Core.GearService.SetShardsRestricted(true); // restore after system runs
        }
        entities.Dispose();
    }
}
```

## One-Shot Patches

Sometimes you only need a patch to run once, typically to detect when the world has finished loading. After it fires, unregister it so it never runs again:

```csharp
[HarmonyPatch(typeof(SpawnTeamSystem_OnPersistenceLoad), nameof(SpawnTeamSystem_OnPersistenceLoad.OnUpdate))]
public static class InitializationPatch
{
    [HarmonyPostfix]
    public static void OneShot_AfterLoad_InitializationPatch()
    {
        Core.InitializeAfterLoaded();
        Plugin.Harmony.Unpatch(
            typeof(SpawnTeamSystem_OnPersistenceLoad).GetMethod("OnUpdate"),
            typeof(InitializationPatch).GetMethod("OneShot_AfterLoad_InitializationPatch")
        );
    }
}
```

`SpawnTeamSystem_OnPersistenceLoad.OnUpdate` is a reliable hook for detecting when the server world is fully ready. After `InitializeAfterLoaded()` runs, the patch unplugs itself so it adds zero overhead from that point on.

## Ordering Patches with [HarmonyBefore] and [HarmonyAfter]

If multiple mods patch the same method and order matters, you can declare priority relative to another mod's GUID:

```csharp
[HarmonyBefore("gg.deca.VampireCommandFramework")]
[HarmonyPatch(typeof(ChatMessageSystem), nameof(ChatMessageSystem.OnUpdate))]
public static class StealthAdminChatPatch
{
    // runs before VCF's own patch on ChatMessageSystem
}
```

This is useful when your patch modifies data that another mod reads, and you need to ensure yours runs first.

## Avoiding Crashes

**Guard against uninitialized Core.** If a system fires before your core services are ready, a null reference will crash the server. Check early:

```csharp
public static void Postfix(ServerBootstrapSystem __instance, NetConnectionId netConnectionId)
{
    if (Core.Players == null) Core.InitializeAfterLoaded();
    // ...
}
```

**Wrap connectivity patches in try/catch.** Connect and disconnect events can fire in edge cases with partial data. Swallowing exceptions here is acceptable since a crash on disconnect would be worse:

```csharp
public static void Postfix(ServerBootstrapSystem __instance, NetConnectionId netConnectionId)
{
    try
    {
        // ... player cache update, etc.
    }
    catch (Exception e)
    {
        Core.Log.LogError($"Failure in OnUserConnected: {e.Message}\n{e.StackTrace}");
    }
}
```

**Never hold onto NativeArray across frames.** Always allocate with `Allocator.Temp` and dispose in the same method. Holding a reference longer than one frame is undefined behavior and will crash.

**Don't call Harmony.UnpatchAll() in Postfix.** Unpatching during execution of a patch causes undefined behavior. Use `Unpatch()` targeting a specific method instead, as shown in the one-shot example above.
