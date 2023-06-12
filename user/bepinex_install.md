---
title: Manual BepInEx Installation
parent: For Users
---

# Manually installing BepInEx

If you're manually installing mods, you need to install BepInEx, you can find it on [thunderstore](https://v-rising.thunderstore.io/package/BepInEx/BepInExPack_V_Rising/). This page guides you through how to unzip the contents and put them in the correct location.

### Inside `BepInExPack_V_Rising_1.668.5.zip`
You will see a folder called `BepInExPack__Rising`, we will be moving the **contents** from folder, not this folder itself:

![image](https://github.com/decaprime/VRising-Modding/assets/62450933/c9b4c268-41ee-4ef9-86df-861e9b4acbbe)

### Inside `BepInExPack_VRising`:
![image](https://github.com/decaprime/VRising-Modding/assets/62450933/d024254d-3a56-46d4-8950-2266017a8f96)
```
BepInEx/
dotnet/
.doorstop_version
doorstop_config.ini
winhttp.dll
```

## Destination

You will be copying all of these files out to the destination game folder.
### For Clients
Find your game folder, it's typically something like `C:\Program Files (x86)\Steam\steamapps\common\VRising`, but you can open this folder precisely by right clicking on the game in steam > manage > browse game files.
![image](https://github.com/decaprime/VRising-Modding/assets/62450933/d86db7f9-1630-47c5-a62f-5301eb62b8e6)

### Client correctly installed
![image](https://github.com/decaprime/VRising-Modding/assets/62450933/995c9f66-6d6f-4733-8030-b595761c0cc1)

### Windows Dedicated Server
Same as above, except the folder is `VRisingDedicatedServer`

### Linux Hosted Server corrected installed
![image](https://github.com/decaprime/VRising-Modding/assets/62450933/18d1c23b-5226-4cc8-93fa-90934934daf2)


# Start game/server after moving all files
This will take a few minutes while BepInEx prepares to load mods for the game. This process will happen on clean installs and game updates. You can tell if it's in the correct place because you will have a `BepInEx/LogOutput.log` generated and if your running a game client you will see a console Window also open with the BepInEx output.
