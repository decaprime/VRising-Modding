---
title: Working with Entities and Components
parent: For Developers
---

# Working with Entities and Components in V Rising

In V Rising's ECS, every game object is an **entity**: a bare integer ID with no data of its own. All data lives in **components** attached to that entity. Your mod reads and writes those components to observe and change game state.

<span style="color: var(--vp-c-text-3); font-size: 0.85em;">Code examples adapted from [KindredCommands](https://github.com/Odjit/KindredCommands) · [AGPL-3.0](https://github.com/Odjit/KindredCommands/blob/main/LICENSE.txt)</span>

## EntityManager

`EntityManager` is the central API for working with entities. In a mod, you access it through your Core class:

```csharp
EntityManager entityManager = Core.EntityManager;
// or
EntityManager entityManager = Core.Server.EntityManager;
```

Most entity operations are available both through `EntityManager` directly and through extension methods on `Entity` itself. The extension methods are more concise and are the preferred style in most V Rising mods.

## Reading Components

**Via extension method (preferred):**

```csharp
Health health = entity.Read<Health>();
float currentHp = health.Value;
```

**Via EntityManager:**

```csharp
Health health = entityManager.GetComponentData<Health>(entity);
```

Both do the same thing. `Read<T>()` is just a shorthand defined in the interop layer.

## Writing Components

Components are value types (structs). You must read, modify, then write back. Editing a local copy does nothing to the entity until you call `Write`:

```csharp
// Heal a player to full
Health health = entity.Read<Health>();
health.Value = health.MaxHealth;
health.MaxRecoveryHealth = health.MaxHealth;
entity.Write(health);
```

**Via EntityManager:**

```csharp
entityManager.SetComponentData(entity, health);
```

## Inline Modification with entity.With()

For quick single-field edits, `With()` lets you modify a component without a separate read/write:

```csharp
entity.With((ref Script_SetFlyingHeightVision_Buff_DataShared flyHeightBuff) =>
{
    flyHeightBuff.Delay = float.MaxValue;
});
```

This reads, calls your lambda, and writes back in one call. It is cleaner than three separate lines for simple mutations.

## Checking Component Presence

Always check before reading a component that may not exist on every entity:

```csharp
if (entity.Has<Durability>())
{
    var durability = entity.Read<Durability>();
    durability.Value = durability.MaxDurability;
    entity.Write(durability);
}
```

**Via EntityManager:**

```csharp
if (entityManager.HasComponent<Durability>(entity))
```

## Adding and Removing Components

Adding or removing components is a **structural change** that moves the entity to a different archetype. This cannot be done while iterating a query (use an ECB instead, covered below).

```csharp
// Add a component
entity.Add<Buff_Persists_Through_Death>();

// Remove a component
entity.Remove<RemoveBuffOnGameplayEvent>();

// Add with initial data
entity.Add<LifeTime>();
entity.Write(new LifeTime
{
    Duration = 30f,
    EndAction = LifeTimeEndAction.Destroy
});
```

## DynamicBuffers

Some components are **buffers**: variable-length lists of structs attached to an entity. Common examples are inventory slots, buff lists, and waypoints.

```csharp
// Read a buffer
DynamicBuffer<UnlockedWaypointElement> waypoints =
    Core.EntityManager.GetBuffer<UnlockedWaypointElement>(userEntity);

// Add to it
waypoints.Add(new UnlockedWaypointElement { Waypoint = waypoint.Read<NetworkId>() });

// Clear it
waypoints.Clear();
```

If the buffer doesn't exist yet on the entity, use `AddBuffer`:

```csharp
DynamicBuffer<UnlockedWaypointElement> waypoints =
    Core.EntityManager.AddBuffer<UnlockedWaypointElement>(userEntity);
```

## Creating Entities

You can create new entities at runtime by passing an array of component types. The game uses this pattern for network events:

```csharp
Entity entity = entityManager.CreateEntity(
    ComponentType.ReadOnly<NetworkEventType>(),
    ComponentType.ReadOnly<SendEventToUser>(),
    ComponentType.ReadOnly<KickEvent>()
);

entity.Write(new KickEvent { PlatformId = user.PlatformId });
entity.Write(new SendEventToUser { UserIndex = user.Index });
entity.Write(new NetworkEventType
{
    EventId = NetworkEvents.EventId_KickEvent,
    IsAdminEvent = false
});
```

This creates a one-frame event entity that the network system processes and then destroys.

## Querying Entities

To find all entities that have certain components, build an `EntityQuery`:

```csharp
EntityQueryDesc queryDesc = new()
{
    All = new ComponentType[]
    {
        new(Il2CppType.Of<PlayerCharacter>(), ComponentType.AccessMode.ReadWrite),
        new(Il2CppType.Of<Health>(), ComponentType.AccessMode.ReadWrite),
    },
    Options = EntityQueryOptions.Default
};

EntityQuery query = Core.EntityManager.CreateEntityQuery(queryDesc);
NativeArray<Entity> entities = query.ToEntityArray(Allocator.Temp);

foreach (var entity in entities)
{
    var health = entity.Read<Health>();
    // ...
}

entities.Dispose();
```

::: warning Cache your EntityQuery
`CreateEntityQuery` is not free. Store the resulting `EntityQuery` as a field on your service class and reuse it across calls. Don't recreate it every frame. Do **not** dispose the query itself; only dispose the `NativeArray<Entity>` that `ToEntityArray` returns.
:::

The [Entity Query Descriptions](/dev/query-descriptions) reference lists every query registered by a game system, including the field name and component filters. Useful when you need to know which query to access in a Harmony patch.

### Query Options

The `Options` field on `EntityQueryDesc` controls which entities are included:

| Option | What it includes |
|---|---|
| `Default` | Active, non-disabled entities only |
| `IncludeDisabled` | Entities with the `Disabled` tag |
| `IncludePrefab` | Prefab entities (templates, not live instances) |
| `IncludeSpawnTag` | Entities currently spawning |
| `IncludeAll` | Everything |

### Filtering with None

Use `None` to exclude entities that have a specific component:

```csharp
EntityQueryDesc queryDesc = new()
{
    All = new ComponentType[] { new(Il2CppType.Of<Health>(), ComponentType.AccessMode.ReadWrite) },
    None = new ComponentType[] { new(Il2CppType.Of<PlayerCharacter>(), ComponentType.AccessMode.ReadWrite) },
};
```

This matches entities with `Health` that are not player characters (NPCs, for example).

### Helper Utilities

Many mods define generic helpers to avoid repeating the query boilerplate. Note that in production code you would cache the `EntityQuery` as a field rather than creating it on each call; this pattern is fine for one-off or infrequent use:

```csharp
public static NativeArray<Entity> GetEntitiesByComponentType<T>(
    bool includeDisabled = false, bool includePrefab = false)
{
    EntityQueryOptions options = EntityQueryOptions.Default;
    if (includeDisabled) options |= EntityQueryOptions.IncludeDisabled;
    if (includePrefab)   options |= EntityQueryOptions.IncludePrefab;

    var queryDesc = new EntityQueryDesc
    {
        All = new ComponentType[] { new(Il2CppType.Of<T>(), ComponentType.AccessMode.ReadWrite) },
        Options = options
    };

    var query = Core.EntityManager.CreateEntityQuery(queryDesc);
    return query.ToEntityArray(Allocator.Temp);
}
```

Usage:

```csharp
var players = GetEntitiesByComponentType<PlayerCharacter>(includeDisabled: true);
foreach (var player in players)
{
    // ...
}
players.Dispose();
```

## EntityCommandBuffer (ECB)

Structural changes (adding/removing components, creating/destroying entities) cannot happen while a query is being iterated. Use an `EntityCommandBuffer` to queue them and apply at the end of the frame:

```csharp
var bufferSystem = Core.Server.GetExistingSystemManaged<EntityCommandBufferSystem>();
EntityCommandBuffer ecb = bufferSystem.CreateCommandBuffer();

// Queue a destroy, will execute at end of frame
ecb.DestroyEntity(entity);

// Queue component removal
ecb.RemoveComponent<SomeComponent>(entity);
```

Inside a Harmony Prefix or Postfix on a system's `OnUpdate`, you can also use the system's own ECB if it exposes one, or create a one-off buffer as above.

## Checking Entity Validity

Entities can be destroyed between frames. Before using an entity you stored from a previous frame, verify it is still alive:

```csharp
if (entity == Entity.Null) return;
if (!Core.EntityManager.Exists(entity)) return;
```

`Entity.Null` is the zero-value entity (index 0, version 0). `Exists()` confirms the entity is still live in the world.
