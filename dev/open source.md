---
title: Open Source Mods
parent: For Developers
---

[//] # To add a mod to these lists requires two steps. 
[//] # Add the name of the mod to the assign list in the appropriate Lists below.
[//] # Include an updated OpenSourceMods.json file in the _data folder of this site.
[//] # The OpenSourceMods.json file can be generated with the Thunderstore API (trimming unneeded information is recommended for file size)
[//] # https://thunderstore.io/c/v-rising/api/v1/package/

<h1>Server Mods</h1>
{% assign server_mods = "KindredCommands,CrimsonFAQ,Bloodcraft,XPRising,KindredPortals,CrimsonBanned,CrimsonDice,CrimsonClans,CrimsonChatFilter,CrimsonDropRate,AutoBrazier,CrimsonMoon,CrimsonLog,KindredLogistics,KindredSchematics,Gator_Bounty,BloodyBoss,Sanguis,BloodyEncounters,BloodyWallet,OfflineRaidGuard,RaidGuard,CrimsonQuest,CrimsonHunt,Protector,BloodyRewards,JewelCreator,ShardExtraLife,CoffinSleep,BloodyShop,BloodyMailBox,BloodyPoint,BloodyMerchant,Notify,AutoCloseDoors,StarterKit,KindredArenas,MuteChatPlayer,BetterMissions,BloodRefill,SpiderKiller" | split: "," | sort %}
<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod_name in server_mods %}
    {% assign mod = site.data.OpenSourceMods | where: "name", mod_name | first %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://github.com/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>

<h1>Client Mods</h1>
{% assign client_mods = "CrimsonFOV,ClientUI,RemoveVersionWatermark,Eclipse" | split: "," | sort %}
<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod_name in client_mods %}
    {% assign mod = site.data.OpenSourceMods | where: "name", mod_name | first %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://github.com/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>

<h1>Frameworks</h1>
{% assign framework_mods = "Bloodstone,VampireCommandFramework,CrimsonSQL,BloodyCore,XPShared" | split: "," | sort %}
<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod_name in framework_mods %}
    {% assign mod = site.data.OpenSourceMods | where: "name", mod_name | first %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://github.com/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>
