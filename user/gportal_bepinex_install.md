---
title: G Portal Manual BepInEx Installation
parent: For Users
---

# Manually installing BepInEx on a G Portal server

##### WARNING: The video hosted on the G Portal Official YouTube Channel is **outdated**. Please follow the below show guide in order to install BepInEx successfully to your G Portal server. If you run into issues, please create a help request under the  technical-support forum channel. 

##### Before you start with this guide make sure to make a backup of your G Portal server so you always have a safe point to return to in case you do things wrong or stuff stops working! You need to enable these backups yourself first! 


If you're manually installing mods on a **G Portal** server, you need to install BepInEx, you can find it on [thunderstore](https://v-rising.thunderstore.io/package/BepInEx/BepInExPack_V_Rising/). This page guides you through how to unzip the contents and put them in the correct location with the use of [FileZilla FTP](https://filezilla-project.org). Please note that you can also make use of other FTP programs but for this demonstration we'll be making use of FileZilla.

## How to make a FTP connection to your G Portal server.
- Log on to the [G Portal](https://www.g-portal.com) website.
- Click on **“My Servers”** in the left menu.
- Select the V Rising server you want to install BepInEx to.  If you have multiple, make sure to select the right one.
- Click on **“Status”** in the left menu
- There you will find the FTP access data in the bottom center of your screen, which you need in order to make a connection through Filezilla.


![image](https://i.imgur.com/4p82jUn.png)

Once you have these details, we can now open up FileZilla and make the connection. At the top left corner you simply fill in the details as shown below. 
- After `Host:`you fill in the IP address of your server given to you by G Portal. 
- After `Username:` you fill in the username given to you by G Portal from the Status page.
- After `Password:` you fill in the password given to you by G Portal from the Status page.
- After `Port:` you fill in the port of the server given to you by G Portal. 

![image](https://i.imgur.com/EbY7Vt1.png)

You can then proceed by pressing the **Quickconnect** button at the right side of this bar. If everything is filled in correctly, you will start seeing the following screen:
![image](https://i.imgur.com/5Mkuity.png)

Now that you have made the required FTP  connection, we can proceed by downloading & installing BepInEx.

## Downloading & Installing BepInEx

Make sure to install the latest version of BepInEx if you haven't done so already. You can find it on [Thunderstore](https://v-rising.thunderstore.io/package/BepInEx/BepInExPack_V_Rising/). Make sure that your server is turned off before you proceed with the below shown steps. 

### Inside `BepInExPack_V_Rising_1.668.5.zip`
You will see a folder called `BepInExPack__Rising`, we will be moving the **contents** from this folder, not this folder itself:

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

Make sure to unzip the `.zip` file to a appropriate location somewhere on your device which is easy to access. Get ready to copy all of these files to the destination within FileZilla. 

## Destination

You will be copying all of these files out to the root directory inside FileZilla. Simply drag and drop and voila. 

![image](https://i.imgur.com/wIcRyZK.png)

Upon completion of the file transfer you should receive a desktop notification that the action went successful. 

![image](https://i.imgur.com/bTSU6ad.png)

You can then proceed by starting your G Portal server. 



# Start game/server after moving all files
This will take a few minutes while BepInEx prepares to load mods for the game. This process will happen on clean installs and game updates. You can tell if it's in the correct place because you will have a `BepInEx/LogOutput.log` generated. 
