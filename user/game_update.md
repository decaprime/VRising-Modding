---
title: 1.0 Game Update
parent: For Users
---

# RE: 1.0 - Updated 5/26
Previous versions of mods and BepInEx do not work with the 1.0 game update. Updates have started to go to the Thunderstore, this page still will list latest release candidates.

### Intended for testing
The remainder of this page is provided for developers and anyone willing to accept any risks in testing pre-released mods, don't expect tech support or full functionality. The purpose of this page is to help gather feedback, please report issues and bugs.

### Public Test Builds:

## [BepInEx 1.691.3 (RC3)](https://github.com/decaprime/VRising-Modding/releases/tag/1.691.3) == Thunderstore 1.691.3

| Mod | Version | Discord | Client | Last Update |
| --- | --- | --- | --- | --- |
| [AutoBrazier](https://github.com/SkyTech6/AutoBrazier/releases/tag/v0.1.0) | 0.1.0 | SkyTech6 | SERVER | May 18 |
| [Bloodcraft](https://github.com/mfoltz/Bloodcraft/releases/tag/V0.1.1) | 0.1.1 | zfolmt | SERVER | May 25 |
| [BloodRefill](https://github.com/skythebro/VMods/releases/tag/BR2.0.0) | 2.0.0 | Skye | SERVER | May 14 |
| [Bloodstone](https://github.com/decaprime/Bloodstone/releases/tag/v0.2.2) [⚠️](#known-issues) | 0.2.2 | deca | BOTH | May 26 |
| [BloodyBoss](https://github.com/oscarpedrero/BloodyBoss/releases/tag/v1.0.8) | 1.0.8 | Trodi | SERVER | May 26 | 
| [BloodyCore](https://github.com/oscarpedrero/BloodyCore/releases/tag/v1.2) | 1.2.2 | Trodi | BOTH | May 25 | 
| [BloodyEncounters](https://github.com/oscarpedrero/BloodyEncounters/releases/tag/v2.0.4) | 2.0.4 | Trodi | SERVER | May 25 |
| [BloodyMailBox](https://github.com/oscarpedrero/BloodyMailBox/releases/tag/v1.0.2) | 1.0.2 | Trodi | SERVER | May 26 |
| [BloodyMerchant](https://github.com/oscarpedrero/BloodyMerchant/releases/tag/v1.0.4) | 1.0.4 | Trodi | SERVER | May 26 |
| [BloodyNotify](https://github.com/oscarpedrero/BloodyNotify/releases/tag/v3.0.6) | 3.0.6 | Trodi | SERVER | May 26 |
| [BloodyPoints](https://github.com/oscarpedrero/BloodyPoints/releases/tag/v2.0.2) | 2.0.2 | Trodi | SERVER | May 20 |
| [BloodyRewards](https://github.com/oscarpedrero/BloodyRewards/releases/tag/v1.0.4) | 1.0.4 | Trodi | SERVER | May 25 |
| [BloodyShop](https://github.com/oscarpedrero/BloodyShop/releases/tag/v1.0.1)  [⚠️](#known-issues) | 1.0.1 | Trodi | BOTH | May 25 |
| [CoffinSleep](https://github.com/skythebro/CoffinSleep/releases/tag/2.1.0) | 2.1.0 | Skye | SERVER | May 19 |
| [GroundItemPickup](https://github.com/skythebro/GroundItemPickup/releases/tag/1.1.0) | 1.1.0 | Skye | SERVER | May 15 |
| [KillSpiders](https://github.com/skythebro/VRisingKillSpiders/releases/tag/1.5.2) | 1.5.2 | Skye | SERVER | May 12 |
| [Killfeed](https://github.com/decaprime/Killfeed/releases/tag/v0.1.1) | 0.1.1 | deca | SERVER | May 11 |
| [KindredArenas](https://github.com/Odjit/KindredArenas/releases/tag/v1.2.0) | 1.2.0 | Odjit | SERVER  | May 23 |
| [KindredCommands](https://github.com/Odjit/KindredCommands/releases/tag/v1.11.0) | 1.11.0 | Odjit | SERVER  | May 23 |
| [KindredLogistics](https://github.com/Odjit/KindredLogistics/releases/tag/V1.0.0) | 1.0.0 | Odjit/Zfolmt | SERVER  | May 19 |
| [LetHorsesJump](https://github.com/skythebro/LetHorsesJump/releases/tag/0.1.0) | 0.1.0 | Skye | SERVER | May 16 |
| [ModernCamera](https://github.com/v-rising/ModernCamera/releases/tag/v2.0.0) | 2.0.0 | iZastic/Dimentox | CLIENT | May 23 |
| [OfflineRaidGuard](https://github.com/SkyTech6/OfflineRaidGuard/releases/tag/0.1.1) | 0.1.1 | SkyTech6 | SERVER | May 23 |
| [RemoveVersionWatermark](https://github.com/NodusCursorius/VRising-RemoveVersionWatermark/releases/tag/1.0.3) | 1.0.3 | Nodus Cursorius | CLIENT | May 17 |
| [RemoveVignette](https://github.com/NodusCursorius/vrising-removevignette/releases/tag/1.2.1) | 1.2.1 | Nodus Cursorius | CLIENT | May 17 |
| [SkanksAIO](https://github.com/skythebro/SkanksAIO/releases/tag/1.6.1) | 1.6.1 | Skye | SERVER | May 23 |
| [VampireCommandFramework](https://github.com/decaprime/VampireCommandFramework/releases/tag/v0.9.0) | 0.9.0 | deca | SERVER | May 18 |
| [XPRising](https://github.com/aontas/XPRising/releases/tag/v0.1.9) | 0.1.9 | chino | SERVER | May 26 |



#### Developer Resources
- Published nuget [VRising.Unhollowed.Client 1.0.2.794360001](https://www.nuget.org/packages/VRising.Unhollowed.Client/1.0.2.794360001) (for RC2)
- Published template [VRising.ModTemplate 0.1.8](<https://www.nuget.org/packages/VRising.ModTemplate/0.1.8>) tested `dotnet new vrisingmod --use-vcf --use-bloodstone` works with versions from above
- [KindredExtract](https://github.com/Odjit/KindredExtract/releases/tag/KindredExtract) 

#### Known Issues
- Bloodstone Keybindings and CustomNetworkEvents are disabled as they do not work yet
- BloodyShop It only works on the server, the client version does not work.
