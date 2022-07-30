# VRising-Modding
🧛‍♂️ A Wiki or something

# For users of mods
This wiki is currently more intended for developers, but here is some FAQ:
- VRising mods: https://v-rising.thunderstore.io/
- Discord: [V Rising Mod Community Discord](https://discord.gg/QG2FmueAG9)
- Support: Check out support channels in the discord or in the mod's readme

# For developers of mods
## Resources
- [Wetstone](https://molenzwiebel.github.io/Wetstone/) - library with some common functions that allows for reloading of mods.
- [Project Template](https://github.com/adainrivers/VRising.ProjectTemplate/) by [@adainrivers](github.com/adainrivers/)
- [VRising Database](https://gaming.tools/vrising)

## How to make a VRising Mod
1. Install BepInEx IL2CPP x64 version from this page (either into VRising or VRising_Server, depending on what you wanna mod):
https://builds.bepinex.dev/projects/bepinex_be
2. Run the game, it should create unhollowed dll's under this folder: {steamfolder}\steamapps\common\VRising\BepInEx\unhollowed
3. Follow to the tutorial:
https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/index.html
Please note that you need to use the il2cpp template, use the following commands:
```
dotnet new -i BepInEx.Templates --nuget-source https://nuget.bepinex.dev/v3/index.json
dotnet new bep6plugin_il2cpp -n VRising.TestPlugin2
```
4. Your csproj file should look like this, change{{=====UPDATE THIS====}} to your steam library path, if you are working on a server mod then add \VRising_Server to the end (I know it's a lot, just simplifies things):

https://gist.github.com/adainrivers/8f9430a9c131f8bf1fce7dbe814baf9a

5. To get decompiled method dumps etc:
Download the Cpp2IL-2022.0.5-Windows.exe from https://github.com/SamboyCoding/Cpp2IL/releases/tag/2022.0.5 into an empty folder, then open a command prompt / powershell / etc. in that folder and run this command Cpp2IL-2022.0.5-Windows.exe --analysis-level=4 --game-path="{PATH\TO\YOUR\GAME\FOLDER}" --exe-name="Vrising" --analyze-all --parallel don't folder to change {PATH\TO\YOUR\GAME\FOLDER} with full path of your game folder. 

6. Sample project from  Night  https://github.com/matt-harp/PopupTotals

7. To debug your plugin using Visual Studio:
   1. Install Visual Studio Tools for Unity using Visual Studio Installer. You can find the component behind Individual components tab.
   2. Edit doorstop_config.ini (either in VRising or VRising_Server folder, depending on what you are modding) and change debugEnabled to true.
   3. Launch the game (or server) with the plugin.
   4. In Visual Studio goto Debug / Attach Unity Debugger, click to Input IP, enter 127.0.0.1:10000 

Credit [@adainrivers](github.com/adainrivers/) for [original](https://discord.com/channels/978094827830915092/978159368312881192/980453110906511410) instructions.
