---
title: Resources
parent: For Developers
---

# Resources for Mod Developers

## Unity Explorer
{: .d-inline-block }

[Unity Explorer](https://github.com/yukieiji/UnityExplorer) is a tool that allows you to dig into the internal structure of the game while it's running.

### Manual Installation
#### Prerequisites
- Install BepInEx 6+ in VRising (make sure you are using one the bleeding edges versions).
 
#### Installation
1. Download the `UnityExplorer.BepInEx.IL2CPP.CoreCLR.zip` directly from the repository [Releases](https://github.com/yukieiji/UnityExplorer/releases)
2. Extract to your desired location.
3. Copy the folder `sinai-dev-UnityExplorer` inside the `plugins` folder to the `BepInEx\plugins` folder.
4. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/yukieiji/UnityExplorer for more information about how to use it.

### Thunderstore Mod Manager
#### Prerequisites
- Install [BepInExPack V Rising](https://thunderstore.io/c/v-rising/p/BepInEx/BepInExPack_V_Rising/).

#### Installation
1. Find for the directory where the mod manager installed your mods (usually that will be on your `%appdata%` folder)
2. Download the `UnityExplorer.BepInEx.IL2CPP.CoreCLR.zip` directly from the repository [Releases](https://github.com/yukieiji/UnityExplorer/releases)
3. Extract to your desired location.
4. Copy the folder `sinai-dev-UnityExplorer` inside the `plugins` folder to the `BepInEx\plugins` folder.
5. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/yukieiji/UnityExplorer for more information about how to use it.

### Building from source
Follow the [Building](https://github.com/yukieiji/UnityExplorer?tab=readme-ov-file#building) section instructions.

---

## Debugging with using Visual Studio (untested/outdated)
1. Install Visual Studio Tools for Unity using Visual Studio Installer. You can find the component behind Individual components tab.
2. Edit doorstop_config.ini (either in VRising or VRising_Server folder, depending on what you are modding) and change debugEnabled to true.
3. Launch the game (or server) with the plugin.
4. In Visual Studio goto Debug / Attach Unity Debugger, click to Input IP, enter 127.0.0.1:10000

---

## Cpp2IL Decompiled Method Dumps (possibly outdated)
Download [Cpp2IL-2022.0.5-Windows.exe](https://github.com/SamboyCoding/Cpp2IL/releases/tag/2022.0.5) into an empty folder, then open a command prompt / powershell / etc. in that folder and run this command:

`Cpp2IL-2022.0.5-Windows.exe --analysis-level=4 --game-path="{PATH\TO\YOUR\GAME\FOLDER}" --exe-name="Vrising" --analyze-all --parallel` (change {PATH\TO\YOUR\GAME\FOLDER} to the full path of your game folder). 
