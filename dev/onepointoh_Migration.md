---
title: Migration Guide for 1.0 Update 
parent: For Developers
---

# Migrating plugins for 1.0

- BepInEx: [Thunderstore 1.691.3](https://v-rising.thunderstore.io/package/BepInEx/BepInExPack_V_Rising/)
- Game Libs: [nuget](https://www.nuget.org/packages/VRising.Unhollowed.Client/)

This version of game libs privately packages the interop changes from above with the already interop'd client assemblies. This avoids the need for the MSBuild task creating the interop and is intended to get developers rolling on release date. 



## `.csproj` changes
```xml

    <PackageReference Include="BepInEx.Unity.IL2CPP" Version="6.0.0-be.691" IncludeAssets="compile" />
    <PackageReference Include="BepInEx.Core" Version="6.0.0-be.691" IncludeAssets="compile" />
	  <PackageReference Include="VRising.Unhollowed.Client" Version="1.0.*" />

```

## Using Changes
`PrefabGUID` calls need `using Stunlock.Core;`

## Namespace Changes (can find replace)
`FixedString64` -> `FixedString64Bytes`
`GetExistingSystem` -> `GetExistingSystemManaged`
`vworld` -> `core`

