---
title: Uploading To Thunderstore
parent: For Developers
---

# How to Upload Mods to Thunderstore for V Rising

Uploading your mod to Thunderstore is a simple process, but it requires a few steps to ensure your mod is correctly packaged and ready for the community to enjoy.

Before uploading your mod to Thunderstore, ensure you have the following:

- A [Thunderstore account](https://v-rising.thunderstore.io/)
- A mod created and **tested** for V Rising.
- A `.zip` file package with your mod. It must contain an icon image, a readme, and a manifest. A changelog is also strongly recommended.

## Login to Thunderstore
Thunderstore doesn't register an account from just an email. You will need either a Discord account, a Github account, or an Overwolf account.
Once you authorize a connection to Thunderstore, you will be logged in with an account that shares the same name of the linked account.

## Pick a Team name
You can decide what name you upload your mods under via a [Team](https://thunderstore.io/settings/teams/). Team functionality allows you to add other people to update mods associated with the team. Do keep in mind that you cannot alter a team name on a modpage. You can also hand over mods via changing a team's owner. You cannot disband (delete) a team that has any packages attached. You may also add a donation link to all mods under the team's name.  

## Preparing your mod package/zip
You will need to make a proper package for your mod. Please remember you cannot edit an upload, so check over everything carefully. You would need to release an update to edit any files contained within the zip.
Thunderstore Upload Resources: [Documentation](https://thunderstore.io/package/create/docs/) | [Manifest Validator](https://thunderstore.io/tools/manifest-v1-validator/) | [Readme Preview](https://thunderstore.io/tools/markdown-preview/)
### Package Format Requirements
  - A valid package is a zip file that contains the following files:
    - your mod's .dll
    - icon.png	PNG icon for the mod, must be 256x256 resolution.
    - README.md	Readme in markdown syntax to be rendered on the package's page.
    - CHANGELOG.md (optional)	Changelog in markdown syntax to be rendered on the package's page.
    - manifest.json	JSON file with the package's metadata.
### Manifest
This contains all the relevant information for your mod. It will determine the details of your mod on it's page. It is also how you update your mod.
![image](https://github.com/user-attachments/assets/6e1dc893-0e79-41db-9c18-2eb2bc6c1ef2)


### Changelog
While a changelog is not required to upload a mod, it is good practice to have to alert users of what changes, fixes, updates etc are present in the new version. Again, everything is in markdown and you can use the readme previewer to check your changelog as well.

---

## Upload Your Mod

1. Navigate to the [Upload page](https://thunderstore.io/c/v-rising/create/)
2. Under the **"Submit Package"** section, click **"Choose or drag file here"** to select your `.zip` file (the mod you created).
3. Use the **Team** dropdown to select your team that you wish to link the mod to.
4. Use the **Communities** dropdown to select V Rising.
5. Once the community is chosen, you can use the **Categories** dropdown to choose the appropriate tags for your mod.
6. Hit **Submit** and wait for the upload to complete. The process might take a few seconds to a minute, depending on the file size.


### IF your package is rejected

- Check your manifest over and make sure you have it and other files correctly formatted.
- Use the tools like maifest validator and readme preview to check it over.
- If you have further issues, seek help on the [Thunderstore discord](https://discord.thunderstore.io/).

## Updating your Mod
To update your mod, you will need to essentially update the zip file and reupload. Make sure to advance the version number in the manifest in order for it to accept a new version.

If you wish to update anything in the zip, the mod, README, CHANGELOG, or MANIFEST, you must upload a new version.

Basic update syntax: `Major.Minor.Patch` Bugfixes are a patch, a few new commands are minor, and big overhauls/major feature introductions or compatability updates are major.
