---
layout: default
title: VBlood Names
parent: Prefabs
data_file: vblood_names
nav_exclude: false
search_exclude: false
---

<h1>{{ page.title }} Prefabs</h1>

{% include data_table_search.html %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Prefab GUID</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {% for row in site.data.prefabs[page.data_file] %}
      <tr>
        <td>{{ row[0] }}</td>
        <td>{{ row[1] }}</td>
        <td>{{ row[2] }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
