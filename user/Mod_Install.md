---
title: Manual Mod Installation
parent: For Users
nav_order: 2
---

# Manually installing Mods

If you're manually installing mods, you need to install BepInEx first. Reference [this page](https://wiki.vrisingmods.com/user/bepinex_install.html) if you have not completed this step.
Do remember that BepInEx will take some time to generate all of the files, so give it time on first boot up and after any game hotfixes.

### Dependencies
Many mods require other mods in order to run. Make sure you have all of the dependencies listed for the mod you are interested in. You will see them listed on Thunderstore on each mod's page like so:
![image](https://github.com/decaprime/VRising-Modding/assets/615782/1014f576-8c2a-4a5c-808c-f32d62bb0d16)


### Inside a Mod folder
Typically, a mod folder will look something like this:

![image](https://github.com/decaprime/VRising-Modding/assets/615782/93f48691-ac63-40ea-8486-eb7e80233fec)

In most cases, you will only need to extract the .dll file of the mod. Make sure to check over the mod's readme to see if there are any other installation instructions particular to that mod.


## Destination

You will be copying files out to the destination game folder.


### For Clients

Find your game folder, it's typically something like `C:\Program Files (x86)\Steam\steamapps\common\VRising`, but you can open this folder precisely by right clicking on the game in steam > manage > browse game files.

![image](https://github.com/decaprime/VRising-Modding/assets/62450933/d86db7f9-1630-47c5-a62f-5301eb62b8e6)

You will then navigate into the `BepInEx` folder you had installed prior. 

![image](https://github.com/decaprime/VRising-Modding/assets/615782/7d2dde3b-a085-4394-9b9b-3ef27bd33f5b)

Then, go to the `Plugins` folder contained within. If you do not see this, BepInEx has not yet been correctly installed.

![image](https://github.com/decaprime/VRising-Modding/assets/615782/dd379469-01b9-4783-8e89-36441b041e9f)

It is here that you will place your mods .dll files into. 

![image](https://github.com/decaprime/VRising-Modding/assets/615782/56df4488-1cd5-4524-9c9c-7174085bf358)


Note for Client ONLY: 
If you are installing server mods into the client (pay attention to thunderstore tags), you will need the mod [ServerLaunchFix](https://thunderstore.io/c/v-rising/p/Mythic/ServerLaunchFix/). This typically takes several round of timing out to let it generate and copy all the files it needs. 
---


### Windows Dedicated Server
Find your game folder. If you are hosting on your own machine, you can find it precisely by right clicking on the dedicated server version of the game in steam > manage > browsegamefiles.

![image](https://github.com/decaprime/VRising-Modding/assets/615782/45801673-9c73-41db-b870-1451c9b8f361)

After that, follow the instructions from the Client to navigate. 

If you are renting a game server, it will often be in the root of your access. 

![image](https://github.com/decaprime/VRising-Modding/assets/615782/51a87793-ceab-42d9-9843-48f63ec008bd)


### Linux Hosted Server
It should look much the same, with other things in the folder.

![image](https://github.com/decaprime/VRising-Modding/assets/615782/ba261b1c-9740-4fac-8f9d-67c2dbfea68b)



# Start game/server after moving all files
Your server should start with mods installed correctly. If it does not, check your `BepInEx/LogOutput.log` to see what is having problems loading. You will need this if you seek technical support from the discord.
