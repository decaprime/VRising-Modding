---
title: dotnet new vrisingmod
parent: For Developers
---

## Template
We have a mod template to make getting started easy

### Installation
`dotnet new --install VRising.ModTemplate`

### Example usage
`dotnet new vrisingmod -n NameOfYourMod --use-vcf --use-bloodstone --description "Description of your mod"`

This will get you started with a mod named _NameOfYourMod_, using [Bloodstone](./bloodstone.md) and [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/) that has a sample server command to uncomment.

## Template Plus
Alternatively, there is also an extended (and opinionated) template available.

### Installation
`dotnet new --install VRising.ModTemplatePlus`

### Example usage
`dotnet new vrisingmodplus -n NameOfYourMod -how -desc "Description of your mod"`

`-how` A simple example mod pre-built and ready to build with how-to tips on how to get started making mods
`-desc` A description of your mod.
`-bloodstone` Include [Bloodstone](./bloodstone.md) framework
`-bloodycore` Include [Bloody.Core](https://github.com/oscarpedrero/BloodyCore) framework
`-vamp` Include [VAMP](https://github.com/CrimsonMods/VAMP) framework

Plus always includes [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/)

### Why Plus?
Plus is created by [CrimsonMods](https://github.com/CrimsonMods), and is opinionated about how to structure mods and what should be included in every V Rising modding project. As such, this template was created as a quicker setup for those that always use X framework or always include Core, Settings, ECSExtensions patterns. And as an added bonus, it was created to include a simple example mod that can be used as a starting point for those that want to get started with modding.
