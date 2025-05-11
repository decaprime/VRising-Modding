---
title: Migration Guide for 1.1 Update
parent: For Developers
---

# Migrating plugins for 1.1

- BepInEx (TESTING): [RC2 1.733.2](https://github.com/decaprime/VRising-Modding/releases/tag/1.733.2)
- VampireCommandFramework (TESTING): [VCF 0.0.999](https://github.com/Odjit/VampireCommandFramework/releases/tag/1.1)
- Game Libs: [nuget](https://www.nuget.org/packages/VRising.Unhollowed.Client/)

This version of game libs privately packages the interop changes from above with the already interop'd client assemblies. This avoids the need for the MSBuild task creating the interop and is intended to get developers rolling on release date. 


## `.csproj` changes
```xml
    <PackageReference Include="BepInEx.PluginInfoProps" Version="2.1.0" />
    <PackageReference Include="BepInEx.Unity.IL2CPP" Version="6.0.0-be.733" IncludeAssets="compile" />
    <PackageReference Include="VRising.Unhollowed.Client" Version="1.1.*" />
```

## ServerChatUtils parameter change (string --> FixedString512Bytes)

```xml
	public static void SendSystemMessage(this User user, string message)
	{
		FixedString512Bytes unityMessage = message;
		ServerChatUtils.SendSystemMessageToClient(Server.EntityManager, user, ref unityMessage);
	}
```

## PrefabGuid Names (PrefabCollectionSystem.PrefabGuidToNameDictionary --> PrefabCollectionSystem._PrefabLookupMap.GetName())

```xml
	public static string LookupName(this PrefabGUID prefabGuid)
	{
		var prefabCollectionSystem = Core.Server.GetExistingSystemManaged<PrefabCollectionSystem>();
		return (prefabCollectionSystem._PrefabLookupMap.GuidToEntityMap.ContainsKey(prefabGuid)
			? prefabCollectionSystem._PrefabLookupMap.GetName(prefabGuid) + " PrefabGuid(" + prefabGuid.GuidHash + ")" : "GUID Not Found");
	}
```

## Creating EntityQueries (EntityQueryDesc --> EntityQueryBuilder w/ Allocator.Temp)

```xml
    var entityQueryBuilder = new EntityQueryBuilder(Allocator.Temp)
        .AddAll(new(Il2CppType.Of<T1>(), ComponentType.AccessMode.ReadWrite))
        .WithOptions(options);
    var query = Core.EntityManager.CreateEntityQuery(ref entityQueryBuilder);
```

## Major System Changes (SystemBase --> ISystem)

- DealDamageSystem
