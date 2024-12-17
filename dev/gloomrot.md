---
title: Migration Guide for Gloomrot
parent: For Developers
nav_exclude: true
has_toc: false
---

# Migrating plugins for glooomrot

- BepInEx: [Thunderstore 1.668.5](https://v-rising.thunderstore.io/package/BepInEx/BepInExPack_V_Rising/)
- Game Libs: [nuget](https://www.nuget.org/packages/VRising.Unhollowed.Client/)

This version of game libs privately packages the interop changes from above with the already interop'd client assemblies. This avoids the need for the MSBuild task creating the interop and is intended to get developers rolling on release date. 

Versioning on nuget is now game version+zero padded 4 digit version to clarify updates between game versions.


### Plugins that used Wetstone: [Migration to Bloodstone](./bloodstone.md#migration-from-wetstone)

## `.csproj` changes
```xml
<TargetFramework>net6.0</TargetFramework>

...

<PackageReference Include="BepInEx.Unity.IL2CPP" Version="6.0.0-be.668" IncludeAssets="compile" />
<PackageReference Include="BepInEx.Core" Version="6.0.0-be.668" IncludeAssets="compile" />
<PackageReference Include="VRising.Unhollowed.Client" Version="0.6.5.*" />

```

## `nuget.config`

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="BepInEx" value="https://nuget.bepinex.dev/v3/index.json" />
    <add key="Samboy Feed" value="https://nuget.samboy.dev/v3/index.json" />
  </packageSources>
</configuration>
```

## Namespace Changes (can find replace)
`using StunLocalization;` -> `using Stunlock.Localization;`

