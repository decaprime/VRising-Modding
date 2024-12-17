---
title: Wetstone -> Bloodstone
parent: For Developers
nav_exclude: true
has_toc: false
---

![bloodstone-banner](https://i.imgur.com/Py0MwUL.png)


# Bloodstone

Bloodstone is a successor to Wetstone for Gloomrot and beyond. It's available on https://www.nuget.org/packages/VRising.Bloodstone/ and https://github.com/decaprime/Bloodstone . It's actively maintained and automated through CI/CD. Soon it will contain VampireCommandFramework and other ECS utilities to make getting started easier with a single file `Bloodstone.dll` dependency.


## Installation

### CLI

```
dotnet add package VRising.Bloodstone
```
or 

### csproj
```csproj
<PackageReference Include="VRising.Bloodstone" Version="0.1.1" />
```


## Migration from Wetstone

Follow installation steps and either way make sure to clear out any Wetstone references you have in your project.

### Namespace changes

You can safely find and replace to do this update, or do it manually:
`Wetstone` -> `Bloodstone`

### Package Id Change

`xyz.molenzwiebel.Wetstone` -> `gg.deca.Bloodstone`
