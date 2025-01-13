---
title: Resources
parent: For Developers
---

# Resources for Mod Developers

## Wiki Resources

### Open Source Mods
The VRising modding community focuses on open-source mods to encourage learning and the development of new features. Feel free to explore and reference any of the open-source mods listed here, but please be sure to **credit the creators** and follow any relevant license requirements.
- [**Open Source Repositories**](https://wiki.vrisingmods.com/dev/open%20source.html)

### Prefabs
- [Prefabs list](https://wiki.vrisingmods.com/prefabs/)
---

## Mod Tools
- [**KindredExtract**](https://github.com/Odjit/KindredExtract) <img src="https://github.com/user-attachments/assets/a0e5a99d-af88-4d9d-9fee-84cc3978aeae" width="60" style="vertical-align: middle;" >
- [**VRising Data Extractor**](https://github.com/adainrivers/virising-data-extractor?tab=readme-ov-file) 
---

## Web Resources
- [VRising Gaming Tools](https://vrising.gaming.tools/) Easy browse for prefabs by in-game names, hit `Developer Info <\>` button to see prefab.
- [Cadrift for VRising](https://www.cadrift.net/v-rising/) Good for reviewing how certain systems work in the game. Keep in mind the territory ID numbers are off though. For those, reference...
- [Territory ID Map](https://i.imgur.com/VkXoKwB.jpeg) Helpful for finding the correct ID for each territory
- [Coordinate/Chunk Map](https://i.imgur.com/UBmjxdG.jpeg) Helpful for at-a-glance general chunk/coordinate reference.
- [Map Icon reference](https://docs.google.com/spreadsheets/d/1FcbO8aMtH2FtSx-ntoMXjoyXhfGQkjnjzj1nkeR2Tk4/edit?gid=0#gid=0) Details about mapicon images.

---

## Unity Explorer
{: .d-inline-block }

[Unity Explorer](https://github.com/yukieiji/UnityExplorer) is a tool that allows you to dig into the internal structure of the game while it's running.


#### Prerequisites
1. Install [BepInEx](https://thunderstore.io/c/v-rising/p/BepInEx/BepInExPack_V_Rising/) in VRising
2. Install the .NET 6 SDK via [manual download](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [winget](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60) (winget install Microsoft.DotNet.SDK.6)

#### Installation
1. Download the `UnityExplorer.BepInEx.IL2CPP.CoreCLR.zip` directly from the repository [Releases](https://github.com/yukieiji/UnityExplorer/releases)
2. Extract to your desired location.
3. Copy the folder `sinai-dev-UnityExplorer` inside the `plugins` folder to the `BepInEx\plugins` folder.
4. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/yukieiji/UnityExplorer for more information about how to use it.





---

