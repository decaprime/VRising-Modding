---
title: Templates
parent: For Developers
---

## Template
We have a mod template to make getting started easy. Adding dependencies will require that anyone using your mod also install those dependencies.
[VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/) is recommended for "public" mods as a common command framework.

### Installation
`dotnet new --install VRising.ModTemplate`

### Example usage
`dotnet new vrisingmod -n NameOfYourMod --use-vcf --use-bloodstone --description "Description of your mod"`

This will get you started with a mod named _NameOfYourMod_, using [Bloodstone](./bloodstone.md) and [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/) that has a sample server command to uncomment.
### Optional Dependencies (add using the --use tag)
- [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/)
- [Bloodstone](./bloodstone.md)


---


## Template Plus
Alternatively, there is also an extended (and opinionated) template available providing optional sample code, a common project structure, multiple framework options, and more. 

### Installation
`dotnet new --install VRising.ModTemplatePlus`

### Example usage
`dotnet new vrisingmodplus -n NameOfYourMod -h -desc "Description of your mod"`

- `-h` A simple example mod pre-built and ready to build with how-to tips on how to get started making mods
- `-desc` A description of your mod.

### Dependencies
- Plus always includes [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/)
- **Optional Dependencies**
  - `-bloodstone` Include [Bloodstone](./bloodstone.md) framework
  - `-bloodycore` Include [Bloody.Core](https://github.com/oscarpedrero/BloodyCore) framework
  - `-vamp` Include [VAMP](https://github.com/CrimsonMods/VAMP) framework


