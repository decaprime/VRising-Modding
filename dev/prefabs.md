---
title: Understanding Prefabs
parent: For Developers
---

# Understanding Prefabs in V Rising

Every item, NPC, buff, structure, and effect in V Rising is defined by a **prefab**. Once you understand how prefabs and entities relate to each other, most of the game's data model clicks into place.

## What is a PrefabGUID?

A `PrefabGUID` is how the game identifies any prefab. It's a struct wrapping a single integer:

```csharp
var buff = new PrefabGUID(-480024072); // Admin_Invulnerable_Buff
```

That number is a stable hash of the prefab's name. It doesn't change between game versions (unless Stunlock renames the asset), so it's safe to hardcode in your mod.

The convention is to collect these in a static `Prefabs.cs` file so you reference them by name rather than scattering raw integers throughout your code:

```csharp
// Instead of this:
ApplyBuff(entity, new PrefabGUID(-480024072));

// Do this:
ApplyBuff(entity, Prefabs.Admin_Invulnerable_Buff);
```

## Entities vs Prefabs

These two things are often confused:

| Concept | What it is |
|---|---|
| **Prefab** | The template. Defines what a thing is: its components, stats, and behavior. |
| **Entity** | A live instance in the world. Just an ID number pointing to component data. |

A prefab is like a blueprint; an entity is what gets built from it. When a vampire spawns a rat, the game looks up the rat prefab, instantiates a new entity from it, and that entity lives in the world until it is destroyed.

Prefabs themselves are stored as entities internally. `PrefabCollectionSystem` holds the lookup table from `PrefabGUID` to the prefab entity.

## How Entities Spawn from Prefabs

When the game (or your mod) wants to create something, it:

1. Looks up the prefab entity by GUID
2. Calls `EntityManager.Instantiate()` on it, which copies all components to a new entity
3. That new entity is the live object in the world

In mod code this looks like:

```csharp
var prefabEntity = Core.PrefabCollectionSystem._PrefabGuidToEntityMap[buffGuid];
var instance = Core.EntityManager.Instantiate(prefabEntity);
```

You can then modify components on `instance` after instantiation before it fully enters the world.

## How to Find Prefab IDs

There are three main ways to find the GUID for what you need:

**The wiki prefab reference**

The [prefab pages on this wiki](/prefabs/) list prefabs by category with their GUIDs. This is the fastest starting point for common things like NPCs, items, and buffs.

**KindredExtract**

[KindredExtract](https://thunderstore.io/c/v-rising/p/Odjit/KindredExtract/) is a server mod that dumps the game's prefab data to files when installed. Run it once and you get a complete set of name-to-GUID mappings for everything in the game. This is the most thorough option, especially after a game update when new prefabs are added.

**Searching existing mods**

Well-named `Prefabs.cs` files in open-source mods are a quick way to find GUIDs for things that other modders have already looked up. Check the [open source mods](/dev/open%20source) list for examples.

## Reading Prefab Dumps

KindredExtract outputs files with entries pairing names to GUIDs. You can load these as embedded resources in your own mod for runtime lookups, or just use them as a reference while writing your `Prefabs.cs` constants.

When searching a dump, look for name patterns:

| Prefix | Category |
|---|---|
| `CHAR_` | NPCs and creatures |
| `Item_` | Items and equipment |
| `Buff_` | Buffs and debuffs |
| `AB_` | Abilities |
| `TM_` | Tile models (structures) |

The [prefab pages on this wiki](/prefabs/) are a browsable, categorized version of this same data, useful for quick lookups without digging through raw files.
