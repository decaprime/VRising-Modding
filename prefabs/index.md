---
layout: default
title: Prefabs
has_children: true
---

# Prefabs

Prefabs are identifers often used in commands or configurations to refer to an object, item, effect, etc.


Full list here **(warning large file)**: [all prefabs](./All) also the remainder of the prefabs with fewer than 10 in a category into [remainders prefabs](./Remainders).

<div class="prefab-list">
  {% for prefab in site.data.prefabs %}
    {% assign name = prefab[0] | replace: ".json", "" %}
    {% if name == "All" %}{% continue %}{% endif %}
    
    <a class="prefab-item" href="{{ site.baseurl }}/prefabs/{{ name }}"><b>{{ name }}</b> ({{prefab[1].size}})</a>

  {% endfor %}
</div>
