---
title: Gloomrot Migration Guide
parent: For Developers
---

### BepInEx **EXPERIMENTAL** [0.668.001](https://github.com/decaprime/VRising-Modding/releases/tag/0.668.001) 
Please don't distribute this, it's not final nor the way we want to distribute BepInEx


### Game Libs: TBD ASAP after release
Initial version will likely not be the *correct* way, just unblocking builds


## `.csproj` changes
```xml
<TargetFramework>net6.0</TargetFramework>

...

<PackageReference Include="BepInEx.Unity.IL2CPP" Version="6.0.0-be*" IncludeAssets="compile" />
<PackageReference Include="BepInEx.Core" Version="6.0.0-be*" IncludeAssets="compile" />

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
