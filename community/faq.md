---
title: Community FAQ
---
# Community FAQ

This page collects common questions from the V Rising modding Discord.

## Installation

<details>
<summary>What do I need to play with mods?</summary>

You will need BepInEx for V Rising, and mods from Thunderstore. Be sure to have any dependencies a particular mod requires.

For more detailed user instructions: [wiki.vrisingmods.com/user/](https://wiki.vrisingmods.com/user/)

</details>

<details>
<summary>Can I use server mods on my singleplayer?</summary>

If playing singleplayer on the client and you want to run server mods, you will need [ServerLaunchFix](https://thunderstore.io/c/v-rising/p/Mythic/ServerLaunchFix/).

</details>

<details>
<summary>I run Linux, can I still run BepInEx?</summary>

Yes, but be prepared for troubleshooting and a more involved setup for servers. V Rising does not have an official Linux dedicated server, and will require running Wine inside a Docker container.

Guide: <https://pimylifeup.com/v-rising-dedicated-server-linux/>

You may also need `WINEDLLOVERRIDES="winhttp=n,b"`, or edit `user.reg` in `.wine` and add `"winhttp"="native,builtin"` to the `DLLoverride` section.

</details>

<details>
<summary>How do I know the mods are working?</summary>

Check the BepInEx logs (`BepInEx/LogOutput.log`) for any messages or errors after launching the game.

Single-player will launch a separate console window if BepInEx is installed correctly. Server console logs can be monitored for the status of BepInEx and installed mods.

Most mods will print messages to the console or log file upon successful loading and initialization.

If one or more installed mods use VCF (Vampire Command Framework), using `.help` in the chatbox should show the usage of detected commands.

</details>

<details>
<summary>How do I configure the mods?</summary>

Most mods provide configuration files located in the `BepInEx/config` directory, stored in a folder with the same name as the mod.

Edit these files using a text editor to adjust config options.

You may use a mod manager to do this, but cannot always rely on them to save config changes accurately — you may have multiple locations to check if troubleshooting is required.

</details>

## Common Errors

<details>
<summary>There is yellow text about "JobTempAlloc has allocations that are more than the maximum lifespan of 4 frames old"</summary>

This appears in the BepInEx console after server startup with or without mods and is not cause for concern on its own.

If mods are installed and this is seen consistently during normal server operation, it may indicate an undisposed allocation. The respective mod developer should be informed if possible.

</details>

<details>
<summary>I used a command and it says "command not found"</summary>

Mod commands are put in the **chatbox**, not the console.

Only use the console for adminauthing or using native V Rising commands.

</details>

<details>
<summary>I used a command and it says denied</summary>

Some commands are restricted to admins.

Server owners may add SteamIDs to the `adminlist.txt` file (one per line, no commas) typically located at `VRisingDedicatedServer\save-data\Settings`.

This will allow players to use the `Adminauth` command in the console (open with tilde `~`, may need to be enabled in the game settings menu).

</details>

<details>
<summary>The mod won't work and the log shows "System.Text.Json.JsonException"</summary>

One of the JSON files in the mod's configuration folder (`BepInEx\Config\ModName`) is likely malformed.

You can validate JSON files at <https://jsonlint.com/>

</details>

<details>
<summary>I'm running ServerLaunchFix and it keeps saying it cannot connect to the remote host</summary>

ServerLaunchFix will take **5–15 minutes** (possibly more depending on your system) to create/copy the unhollowed DLL cache required to use mods, in addition to copying over any mods being used.

After it completes successfully once, later launches will be significantly faster and it will not need to rebuild the cache until the game updates.

More details: <https://thunderstore.io/c/v-rising/p/Mythic/ServerLaunchFix/>

</details>

<details>
<summary>I've installed BepInEx but it says "Fatal error. System.AccessViolationException"</summary>

We typically see this when an anti-virus or firewall is blocking BepInEx from functioning.

You will need to allow it past whichever security software is preventing it.

</details>

## General

<details>
<summary>I have a cracked version of the game, can you help me?</summary>

No support of any kind will be provided for non-legitimate copies of the game.

</details>

<details>
<summary>What is SLS's position on modding?</summary>

> "Our official stance on mods right now is that we're alright with mods that don't offer explicit advantages for PvP, and as long as you don't use them on official servers. Use them on your own servers as much as you like, go nuts."
>
> — June 2, 2022 · [Source](https://discord.com/channels/803241158054510612/803274276399611924/981912054950678529)

> "We don't disallow modding, but it's hard to do and there's no official framework for it."
>
> — Nov 7, 2024 · [Source](https://discord.com/channels/803241158054510612/803274276399611924/1303963363478470726)

*Jeremy Bearson — Stunlock Studios Community Developer*

</details>

<details>
<summary>Are some mods considered cheating on servers?</summary>

Server mods, being installed by the server owner and implicitly allowed, are somewhat exempt from this consideration as gameplay logic is controlled by the server.

However, some client mods could be considered cheating depending on the server. If a server owner has requested specific mods not be used, it is important to respect that.

Stunlock Studios does not allow mods that give PvP advantages on official PvP servers, including mods like ModernCamera.

</details>

<details>
<summary>If a server runs mods do players need them installed?</summary>

No. Server mods only need to be installed on the server itself.

Only mods marked for **client** need to be installed by players.

</details>

<details>
<summary>Can I play with friends who don't have mods installed?</summary>

Yes. Client-side mods will not prevent you from playing on servers with your friends.

Server-side mods will work for all players connected without requiring installation on their clients.

</details>

<details>
<summary>Does "xxx" mod work?</summary>

Major game updates (and sometimes hotfixes) can introduce changes that mod developers must update for. Mods not updated for the current version may have issues.

Thunderstore mod tags typically indicate the game version a mod supports.

</details>

<details>
<summary>Where can I see a list of prefabs?</summary>

- Prefab categories: [wiki.vrisingmods.com/prefabs/](https://wiki.vrisingmods.com/prefabs/)
- Full prefab search: [wiki.vrisingmods.com/prefabs/All](https://wiki.vrisingmods.com/prefabs/All)

</details>

## Development

<details>
<summary>How do I start developing a mod for V Rising?</summary>

Guide: [wiki.vrisingmods.com/dev/development_setup](https://wiki.vrisingmods.com/dev/development_setup.html)

</details>

<details>
<summary>What language / engine does V Rising modding use?</summary>

V Rising is built using **Unity DOTS**, which includes an **Entity Component System (ECS)** architecture. Game code is compiled natively using **IL2CPP**.

The modding community writes mods using **C#**.

</details>

<details>
<summary>How do I view the decompiled game code?</summary>

Tools like **dnSpy**, **dotPeek**, or **ILSpy** can inspect the `.dll` files inside the interop folder generated by BepInEx after installation.

See the [development setup guide](/dev/development_setup) for more details.

</details>

<details>
<summary>Where can I find the components on prefabs?</summary>

Prefab component dump: [Discord link](https://discord.com/channels/978094827830915092/980867960933609492/1245457424987717764)

</details>

<details>
<summary>What systems can I patch or hook into from the server?</summary>

Server systems and queries: [Discord link](https://discord.com/channels/978094827830915092/980867960933609492/1245391001452023818)

</details>

<details>
<summary>What open source mods can I reference?</summary>

[wiki.vrisingmods.com/dev/open source](/dev/open%20source)

</details>

## Thunderstore

<details>
<summary>How do I know which mods work?</summary>

Most mod pages on Thunderstore include category tags referencing major game versions the mod supports.

Mods not updated for the current version may have reduced functionality or stop working entirely.

</details>

<details>
<summary>How do I upload a mod?</summary>

Guide: [wiki.vrisingmods.com/dev/upload_to_thunderstore](/dev/upload_to_thunderstore)

</details>

<details>
<summary>Can I edit a mod after uploading?</summary>

You cannot edit an existing release. You must increment the version number in the manifest and upload a new package.

</details>

<details>
<summary>How can I add others to update my mods?</summary>

On the settings page of your Thunderstore account you can create **teams**.

If a mod is uploaded using the team name as the author, any member of that team can upload updates.

</details>
