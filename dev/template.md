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
