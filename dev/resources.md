---
title: Resources
parent: For Developers
---

# Resources for Mod Developers

## Unity Explorer
{: .d-inline-block }

[Unity Explorer](https://github.com/kremnev8/UnityExplorer) is a tool that allows you to dig into the internal structure of the game while it's running.

#### Thunderstore Version
[UnityExplorer IL2CPP at Thunderstore](https://v-rising.thunderstore.io/package/CoreMods/UnityExplorer_IL2CPP/)

### Building from source
Unity Explorer can be built from source and installed manually:

#### Prerequisites
1. Install BepInEx in VRising
2. Install the .NET 6 SDK via [manual download](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [winget](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60) (winget install Microsoft.DotNet.SDK.6)

#### Build Instructions
1. Clone https://github.com/kremnev8/UnityExplorer
1. In a terminal in the `UnityExplorer` directory, run `dotnet build -c BIE_Cpp_CoreCLR .\src\UnityExplorer.csproj`. This will build the plugin.
2. Copy all of the files in the `Release\Release\UnityExplorer.BepInEx.IL2CPP.CoreCLR` subdirectory to the BepInEx plugin directory at `<steamapps>\common\VRising\BepInEx\plugins`.
3. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/kremnev8/UnityExplorer for more information about how to use it.

---

## Debugging with using Visual Studio (untested)
1. Install Visual Studio Tools for Unity using Visual Studio Installer. You can find the component behind Individual components tab.
2. Edit doorstop_config.ini (either in VRising or VRising_Server folder, depending on what you are modding) and change debugEnabled to true.
3. Launch the game (or server) with the plugin.
4. In Visual Studio goto Debug / Attach Unity Debugger, click to Input IP, enter 127.0.0.1:10000

---

## Cpp2IL Decompiled Method Dumps
Download [Cpp2IL-2022.0.5-Windows.exe](https://github.com/SamboyCoding/Cpp2IL/releases/tag/2022.0.5) into an empty folder, then open a command prompt / powershell / etc. in that folder and run this command:

`Cpp2IL-2022.0.5-Windows.exe --analysis-level=4 --game-path="{PATH\TO\YOUR\GAME\FOLDER}" --exe-name="Vrising" --analyze-all --parallel` (change {PATH\TO\YOUR\GAME\FOLDER} to the full path of your game folder). 
