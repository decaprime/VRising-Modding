---
title: Saves & Autosaves
parent: For Users
---

# Saves & Autosaves

## Save file location

Save files are stored under the persistent data path. The default location is:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRisingServer\Saves\
```

The default start script included with the dedicated server sets `-persistentDataPath .\save-data`, making the effective path:

```
<Steam>\steamapps\common\VRisingDedicatedServer\save-data\
```

Most dedicated server setups will therefore use this location. Saves are always written to a `Saves\` subfolder within whatever path is specified (see [Server Configuration Overview](/user/server-configuration)).

It is strongly recommended to back up save files regularly, and always before updating the server.

## AutoSaveCount

`AutoSaveCount` in `ServerHostSettings.json` controls the maximum total number of autosave files to keep. Once the limit is reached, the oldest saves are deleted. If you only want simple rolling saves and do not need `AutoSaveSmartKeep`, set `AutoSaveSmartKeep` to an empty value and rely on this alone.

## AutoSaveSmartKeep

`AutoSaveSmartKeep` gives you a more flexible retention policy. Instead of just keeping the last N saves, it lets you define time-based buckets so that you retain recent saves frequently and older saves more sparsely.

The format is a comma-separated list of `A:B:C` entries:

- `A` = time window in minutes (from now, going back)
- `B` = number of the **newest** saves within that window to keep
- `C` = number of the **oldest** saves within that window to keep

Each window is evaluated relative to the end of the previous one, so the ranges do not overlap.

**Example:** `10:2:1,60:0:1,120:0:1`

- Keep 2 newest and 1 oldest save from the last 10 minutes
- Keep 1 oldest save from the 10-60 minute window
- Keep 1 oldest save from the 60-120 minute window

`AutoSaveSmartKeep` is evaluated at each autosave. After it runs, `AutoSaveCount` is applied as a final hard cap, removing the oldest files until the total is at or below the limit.

The default value keeps a dense set of recent saves that thins out over days, which is suitable for most servers.

## Transferring a client-hosted save to a dedicated server

Client saves are stored at:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRising\CloudSaves\<SteamID>\v4\
```

or, if not using cloud saves:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRising\Saves\v4\
```

Each session is a folder with a random GUID name. To find the one you want, open the in-game **Load Game** menu, select the save, and click **Go to Directory** to open it in Explorer.

**Steps to transfer:**

1. Back up the session folder before touching anything.
2. Optionally clean up the folder: remove `ServerHostSettings.json` if your server is already configured, and remove all autosaves except the most recent (the server loads the latest one).
3. Rename the GUID folder to something simple (e.g. `myworld`).
4. Copy the folder to `<PersistentDataPath>\Saves\v4\` on your server.
5. Start the server with `-saveName myworld` to point it at the transferred save.
6. Make sure `GameSettingsPreset` is empty in `ServerHostSettings.json` and that you have no override `ServerGameSettings.json` in the settings folder, so the game settings from the copied save are used as-is.
7. Once confirmed working, remove the original session from the client via the in-game **Load Game** menu (important if using Cloud Saves, as deleting files manually will be undone by cloud sync on next launch).
