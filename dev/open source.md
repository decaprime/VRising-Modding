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

{% assign unique_mods = site.data.OpenSourceMods | group_by: "name" %}

{% assign server_mods_data = unique_mods | where_exp: "group", "server_mods contains group.name" %}
{% assign client_mods_data = unique_mods | where_exp: "group", "client_mods contains group.name" %}
{% assign framework_mods_data = unique_mods | where_exp: "group", "framework_mods contains group.name" %}

{% assign server_mods_data = server_mods_data | reject_exp: "group", "group.first.is_deprecated == true" %}
{% assign client_mods_data = client_mods_data | reject_exp: "group", "group.first.is_deprecated == true" %}
{% assign framework_mods_data = framework_mods_data | reject_exp: "group", "group.first.is_deprecated == true" %}

<h1>Server Mods</h1>

<table>
  <tr>
    <th>Mod Name</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  {% for group in server_mods_data %}
    {% assign latest_version = group.items | sort: "date_updated" | reverse | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ latest_version.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ latest_version.owner }}">{{ latest_version.owner }}</a></td>
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
  {% for group in client_mods_data %}
    {% assign latest_version = group.items | sort: "date_updated" | reverse | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ latest_version.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ latest_version.owner }}">{{ latest_version.owner }}</a></td>
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
  {% for group in framework_mods_data %}
    {% assign latest_version = group.items | sort: "date_updated" | reverse | first %}
    <tr>
      <td><a href="{{ latest_version.website_url }}">{{ latest_version.name }}</a></td>
      <td>{{ latest_version.description }}</td>
      <td><a href="https://thunderstore.io/c/v-rising/p/{{ latest_version.owner }}">{{ latest_version.owner }}</a></td>
    </tr>
  {% endfor %}
</table>
