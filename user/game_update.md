---
title: 1.0 Game Update
parent: For Users
---

# RE: 1.0 - Updated 5/18
Previous versions of mods and BepInEx do not work with the 1.0 game update. There will be an announcement in discord and versions published to Thunderstore when they are ready. We have a BepInEx release candidate that we need developers to update and test their mods with.

### Mod Development Community
The remainder of this page is provided for developers and anyone willing to accept any risks in testing pre-released mods, don't expect support or full functionality. The purpose of this page is to help gather feedback, please report issues and bugs.

### Public Test Builds:

## **RC2** [BepInEx 1.690.2](https://github.com/decaprime/VRising-Modding/releases/tag/1.690.2)

| Mod | Version | Discord | Client | Known Issues |
| --- | --- | --- | --- | --- |
| [Bloodstone](https://github.com/decaprime/Bloodstone/releases/tag/v0.2.1) | 0.2.1 | deca | BOTH | [⚠️](#known-issues) |
| [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/releases/tag/v0.9.0) | 0.9.0 | deca | SERVER | |
| [Killfeed](https://github.com/decaprime/Killfeed/releases/tag/v0.1.1) | 0.1.1 | deca | SERVER | |
| [KindredCommands](https://github.com/Odjit/KindredCommands/releases/tag/v1.9.1) | 1.9.1 | Odjit | SERVER  | |
| [XPRising](https://github.com/aontas/XPRising/releases/tag/v0.1.4) | 0.1.4 | chino | SERVER | |
| [KillSpiders](https://github.com/skythebro/VRisingKillSpiders/releases/tag/1.5.2) | 1.5.2 | Skye | SERVER | |
| [RemoveVignette](https://github.com/NodusCursorius/vrising-removevignette/releases/tag/1.2.1) | 1.2.1 | Nodus Cursorius | CLIENT | |
| [RemoveVersionWatermark](https://github.com/NodusCursorius/VRising-RemoveVersionWatermark/releases/tag/1.0.3) | 1.0.3 | Nodus Cursorius | CLIENT | |
| [BloodRefill](https://github.com/skythebro/VMods/releases/tag/BR2.0.0) | 2.0.0 | Skye | SERVER | |
| [SkanksAIO](https://github.com/skythebro/SkanksAIO/releases/tag/1.5.0) | 1.5.0 | Skye | SERVER | |
| [GroundItemPickup](https://github.com/skythebro/GroundItemPickup/releases/tag/1.1.0) | 1.1.0 | Skye | SERVER | |
| [LetHorsesJump](https://github.com/skythebro/LetHorsesJump/releases/tag/0.1.0) | 0.1.0 | Skye | SERVER | |
| [BloodyNotify](https://github.com/oscarpedrero/BloodyNotify/releases/tag/v3.0.2) | 3.0.2 | Trodi | SERVER | |
| [BloodyBoss](https://github.com/oscarpedrero/BloodyBoss/releases/tag/v1.0.3) | 1.0.3 | Trodi | SERVER | |
| [BloodyEncounters](https://github.com/oscarpedrero/BloodyEncounters/releases/tag/v2.0.3) | 2.0.3 | Trodi | SERVER | |
| [BloodyMerchant](https://github.com/oscarpedrero/BloodyMerchant/releases/tag/v1.0.3) | 1.0.3| Trodi | SERVER | |
| [BloodyRewards](https://github.com/oscarpedrero/BloodyRewards/releases/tag/v1.0.2) | 1.0.2 | Trodi | SERVER | |
| [BloodyPoints](https://github.com/oscarpedrero/BloodyPoints/releases/tag/v2.0.0) | 2.0.0 | Trodi | SERVER | |
| [AutoBrazier](https://github.com/SkyTech6/AutoBrazier/releases/tag/v0.1.0) | 0.1.0 | SkyTech6 | SERVER | |
| [CoffinSleep](https://github.com/skythebro/CoffinSleep/releases/tag/2.1.0) | 2.1.0 | Skye | SERVER | |
#### Developer Resources
- Published nuget [VRising.Unhollowed.Client 1.0.2.794360001](https://www.nuget.org/packages/VRising.Unhollowed.Client/1.0.2.794360001) (for RC2)
- Published template [VRising.ModTemplate 0.1.8](<https://www.nuget.org/packages/VRising.ModTemplate/0.1.8>) tested `dotnet new vrisingmod --use-vcf --use-bloodstone` works with versions from above
- [KindredExtract](https://github.com/Odjit/KindredExtract/releases/tag/KindredExtract) 

#### Known Issues
- Bloodstone will crash on client launch
- Bloodstone Keybindings do not work (are disabled)
- CustomNetworkEvents Broken (deca:wip)
