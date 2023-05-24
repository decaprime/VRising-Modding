---
title: Resources
parent: For Developers
---

## Resources for Mod Developers

### Unity Explorer

[Unity Explorer](https://github.com/kremnev8/UnityExplorer) is a tool that allows you to dig into the internal structure of the game while it's running.

Gloomrot {: .label .label-green } Unity Explorer needs to be built from source and installed manually:

#### Prerequisites
1. Install BepInEx in VRising
2. Install the .NET 6 SDK via [manual download](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [winget](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60) (winget install Microsoft.DotNet.SDK.6)

#### Instructions
1. Clone https://github.com/kremnev8/UnityExplorer
1. In a terminal in the `UnityExplorer` directory, run `dotnet build -c BIE_Cpp_CoreCLR .\src\UnityExplorer.csproj`. This will build the plugin.
2. Copy all of the files in the `Release\Release\UnityExplorer.BepInEx.IL2CPP.CoreCLR` subdirectory to the BepInEx plugin directory at `<steamapps>\common\VRising\BepInEx\plugins`.
3. The next time you run the game with BepInEx, the Unity Explorer UI will be overlayed in the game. See https://github.com/kremnev8/UnityExplorer for more information about how to use it.
