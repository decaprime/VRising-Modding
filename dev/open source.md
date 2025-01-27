---
title: Open Source Mods
parent: Resources
---

<!---
To add a mod to these lists requires two steps. 
Add the name of the mod to the assign list in the appropriate Lists below.
Include an updated OpenSourceMods.json file in the _data folder of this site.
The OpenSourceMods.json file can be generated with the Thunderstore API (trimming unneeded information is recommended for file size)
https://thunderstore.io/c/v-rising/api/v1/package/
-->
{% assign all_mods = site.data.OpenSourceMods %}
{% assign server_mods = "KindredCommands,Bloodcraft,XPRising,KindredPortals,AutoBrazier,KindredLogistics,KindredSchematics,Gator_Bounty,BloodyBoss,Sanguis,BloodyEncounters,BloodyWallet,RaidGuard,Protector,BloodyRewards,JewelCreator,ShardExtraLife,CoffinSleep,BloodyShop,BloodyMailBox,BloodyPoint,BloodyMerchant,Notify,AutoCloseDoors,StarterKit,KindredArenas,MuteChatPlayer,BetterMissions,BloodRefill,SpiderKiller" | split: "," %}
{% assign client_mods = "ClientUI,RemoveVersionWatermark,Eclipse" | split: "," %}
{% assign framework_mods = "Bloodstone,VampireCommandFramework,CrimsonSQL,BloodyCore,XPShared" | split: "," %}

{% assign unique_server_mods = "" | split: "," %}
{% for mod in all_mods %}
    {% if server_mods contains mod.name %}
        {% assign duplicate_exists = false %}
        {% assign mod_key = mod.name | append: '_' | append: mod.author %}
        {% if unique_server_mods contains mod_key %}
            {% assign duplicate_exists = true %}
        {% endif %}
        {% unless duplicate_exists or mod.is_deprecated == true %}
            {% assign unique_server_mods = unique_server_mods | push: mod_key %}
            {% assign unique_server_mods = unique_server_mods | push: mod %}
        {% endunless %}
    {% endif %}
{% endfor %}

{% assign unique_client_mods = "" | split: "," %}
{% for mod in all_mods %}
    {% if client_mods contains mod.name %}
        {% assign duplicate_exists = false %}
        {% assign mod_key = mod.name | append: '_' | append: mod.author %}
        {% if unique_client_mods contains mod_key %}
            {% assign duplicate_exists = true %}
        {% endif %}
        {% unless duplicate_exists or mod.is_deprecated == true %}
            {% assign unique_client_mods = unique_client_mods | push: mod_key %}
            {% assign unique_client_mods = unique_client_mods | push: mod %}
        {% endunless %}
    {% endif %}
{% endfor %}

{% assign unique_framework_mods = "" | split: "," %}
{% for mod in all_mods %}
    {% if framework_mods contains mod.name %}
        {% assign duplicate_exists = false %}
        {% assign mod_key = mod.name | append: '_' | append: mod.author %}
        {% if unique_framework_mods contains mod_key %}
            {% assign duplicate_exists = true %}
        {% endif %}
        {% unless duplicate_exists or mod.is_deprecated == true %}
            {% assign unique_framework_mods = unique_framework_mods | push: mod_key %}
            {% assign unique_framework_mods = unique_framework_mods | push: mod %}
        {% endunless %}
    {% endif %}
{% endfor %}

{% assign server_mods_data = unique_server_mods 
    | where_exp: "item", "item.date_updated" 
    | sort: "date_updated" 
    | reverse 
%}

{% assign client_mods_data = unique_client_mods 
    | where_exp: "item", "item.date_updated" 
    | sort: "date_updated" 
    | reverse 
%}

{% assign framework_mods_data = unique_framework_mods 
    | where_exp: "item", "item.date_updated" 
    | sort: "date_updated" 
    | reverse 
%}
<h1>Server Mods</h1>

<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod in server_mods_data %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>

<h1>Client Mods</h1>
<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod in client_mods_data %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>

<h1>Frameworks</h1>
<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for mod in framework_mods_data %}
    {% assign latest_version = mod.versions | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ mod.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ mod.owner }}">{{ mod.owner }}</a></td>
    </tr>
  {% endfor %}
</table>
