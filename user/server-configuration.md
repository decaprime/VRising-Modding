---
title: Server Configuration Overview
parent: For Users
---

# Server Configuration Overview

## Every game is a server

V Rising has no separate multiplayer mode. Whether you are playing solo, hosting a LAN game for friends, or running a public dedicated server, the game always starts a server process. The difference is only where that process runs:

- **Private / LAN game:** the server runs inside the game client on your PC. Settings are configured through the in-game UI.
- **Dedicated server:** the server runs as a standalone process (via `VRisingServer.exe`), usually on a separate machine. Settings are configured through JSON files.

Both modes use the same underlying settings system. Understanding one helps with the other.

## The two settings files

Server behaviour is split across two JSON files:

**`ServerHostSettings.json`** controls server infrastructure: things that affect how the server runs, not what happens inside the game world.
- Network (port, name, password, max players)
- Saves (auto-save interval, slot count)
- RCON remote console
- AFK kick, API, admin list

**`ServerGameSettings.json`** controls gameplay rules: everything that affects the experience inside the world.
- Game mode, PvP rules, castle damage
- Loot rates, crafting speed, resource yields
- Vampire and enemy stat multipliers
- Castle limits, servant limits, build height
- PvP and raid scheduling windows

### File locations

Settings are loaded in two layers: defaults first, then local overrides.

**Default files** are loaded from the installation folder and are not meant to be edited directly:

- Dedicated server: `<Steam>\steamapps\common\VRisingDedicatedServer\VRisingServer_Data\StreamingAssets\Settings\`
- Client-hosted: `<Steam>\steamapps\common\VRising\VRising_Data\StreamingAssets\Settings\`

**Local overrides** are read from the persistent data path after the defaults. This is where you place your customised files:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRisingServer\Settings\
```

This folder is empty by default. You can place a full settings file here, or only the keys you want to differ from the defaults.

The persistent data path can be changed with the `-persistentDataPath` launch parameter, which is recommended for most setups and required if you run multiple servers on one host. Whatever path you specify, the server reads settings from a `Settings\` subfolder and writes saves to a `Saves\` subfolder within it.

Settings files found within a save folder can also override the base settings in the same way, taking priority over the files above.

**Private game presets** configured through the in-game UI are stored as generated-name files under:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRising\ServerSettingsPresets\
```

## You only need to include what you want to change

Neither file needs to contain every setting. The server reads whatever keys are present and uses built-in defaults for anything missing. A minimal `ServerGameSettings.json` might be just a few lines:

```json
{
  "GameModeType": "PvE",
  "ClanSize": 6,
  "CraftRateModifier": 2.0
}
```

This is the safest way to manage settings. Your file stays small, diffs are readable, and game updates that add new settings fall back to defaults automatically.

## How difficulty presets work

`ServerHostSettings.json` has a `GameDifficultyPreset` field that acts as a bundle shortcut. Setting it to a named preset (for example `"Relaxed"` or `"Brutal"`) overrides a collection of `ServerGameSettings.json` values at server startup, including blood drain rate, enemy health and damage, loot rates, and sun damage.

The preset takes priority over whatever is set in `ServerGameSettings.json`. Individual keys in that file will be ignored for any field the preset controls:

```json
// ServerHostSettings.json
{ "GameDifficultyPreset": "Brutal" }

// ServerGameSettings.json - this BloodDrainModifier will be ignored; Brutal's value wins
{ "BloodDrainModifier": 1.5 }
```

`GameDifficulty` (in `ServerGameSettings.json`) is a separate, narrower setting that controls boss behaviour complexity only. It is not the same as the preset.

## See also

- [Server Host Settings](/user/server-host-settings): full reference for `ServerHostSettings.json`
- [Server Game Settings](/user/server-game-settings): full reference for `ServerGameSettings.json`
- [Official dedicated server instructions](https://github.com/StunlockStudios/vrising-dedicated-server-instructions/tree/master) (Stunlock Studios, GitHub)
