---
title: Using Server Mods in-game
parent: For Users
nav_order: 3
---

# How to use Server Mods In-Game
- [Adding to the AdminList](#adding-to-the-adminlist)
- [Authorizing yourself as an Admin in-game](#authorizing-yourself-as-an-admin-in-game)
- [Enabling Console](#enabling-console)
- [Using the Console in Game](#using-the-console-in-game)
- [Using Native V Rising Commands (Console)](#using-native-v-rising-commands-console)
- [Using MOD Commands (Chatbox)](#using-mod-commands-chatbox)


## Adding to the AdminList
The very first thing you will need to do is add yourself to the list of admins. 
You will need to navigate to your Server's adminlist location. Typically, this will be found at `C:\Program Files (x86)\Steam\steamapps\common\VRisingDedicatedServer\save-data\Settings`

![image](https://github.com/decaprime/VRising-Modding/assets/615782/5312f4a5-a5b6-4df8-abf7-d4b38b34e6fe)

Within this file you will need to add your steamID. 
In the Steam desktop application, select your Steam username in the top right corner of the screen. Select ''Account details''. Your Steam ID can be found below your Steam username.


![image](https://github.com/decaprime/VRising-Modding/assets/615782/bb5c2f3b-14ed-40bd-bafe-7b867f5467a1)

Add your steamID to the adminlist.txt and save it. Numbers can be added, one per line. No other characters needed. (X's are merely to demonstrate how it looks with multiple numbers)

![image](https://github.com/decaprime/VRising-Modding/assets/615782/82569d5c-ad2e-4810-994f-203c030d8ab0)

You can do this before launching the server, or even after. If you do it after, the game may take up to 5 minutes (or your autosave frequency) to re-read the list of admins and enable your ability to authorize.


## Authorizing yourself as an Admin in-game

Once in game you will need to auhtorize yourself as an admin.

## Enabling Console
First you will need to enable the use of the console in game.
Hit `Esc` and in the menu, go to `Options`.
Once here, stay under the `General` tab and look at the options. You should see a `Console Enabled ` option about 8 rows down.

![image](https://github.com/decaprime/VRising-Modding/assets/615782/989d2390-29d9-4195-a3bf-cd20c36ceb97)

Make sure the box is ticked as indicated.

## Using the Console in Game

Once you are back to the game, you can make the console appear by pressing the `~` button. (Usually located directly above TAB)

![image](https://github.com/decaprime/VRising-Modding/assets/615782/8162e02e-e0af-46de-ba27-b7207b9e48f8)

Once the console has dropped down, you can type in `Adminauth` to authorize yourself as an admin. You will need to do this every time you log in. If you are successful, you will see this message in the chatbox:

![image](https://github.com/decaprime/VRising-Modding/assets/615782/fcb3b5c7-c0a2-43c1-a48d-4052309cb107)


## Using Native V Rising Commands (Console)

Much like authorizing yourself, you may enter commands in this console in order to use native V Rising commands. You can see a list of commands by typing in `list`. (Take care it doesn't autocomplete to `listusers`)
Commands in the console do not have a prefix as part of the command. (No slashes and the like)

## Using MOD Commands (Chatbox)

Mod commands however, are not entered in the console. They must be entered in the chat. If you have VCF installed, you can check this by typing `.help`
Most mods ustilize the `.` prefix before their commands, as they use VCF. If they are not using VCF it could be other symbols.
You should get a response like: 

![image](https://github.com/decaprime/VRising-Modding/assets/615782/0ca46993-a120-453d-9841-82b0f5aebb5b)








