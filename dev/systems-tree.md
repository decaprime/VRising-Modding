---
title: System Update Tree
parent: For Developers
---

<script setup>
import { onMounted } from 'vue'
import systemsTree from '@data/systemsTree.json'

onMounted(() => {
  const container = document.getElementById('stree-container');
  const searchEl  = document.getElementById('stree-search');
  const infoEl    = document.getElementById('stree-info');

  let flatData = [];

  function shortName(n) { const i = n.lastIndexOf('.'); return i >= 0 ? n.substring(i + 1) : n; }
  function nsPrefix(n)   { const i = n.lastIndexOf('.'); return i >= 0 ? n.substring(0, i + 1) : ''; }

  function badgeCls(type) {
    if (type === 'Group')   return 'stree-badge--group';
    if (type === 'ISystem') return 'stree-badge--isystem';
    return 'stree-badge--csb';
  }

  function renderNode(node) {
    const sn = shortName(node.name);
    const ns = nsPrefix(node.name);
    const badge = `<span class="stree-badge ${badgeCls(node.type)}">${node.type}</span>`;

    if (node.type === 'Group') {
      const kids = (node.children || []).map(renderNode).join('');
      const desc = node.descendants != null ? `<span class="stree-desc">${node.descendants} systems</span>` : '';
      return `<div class="stree-group">
        <div class="stree-group-row">
          <span class="stree-arrow">▸</span>
          <span class="stree-short" title="${node.name}">${sn}</span><span class="stree-ns">${ns}</span>${badge}${desc}
        </div>
        <div class="stree-children" hidden>${kids}</div>
      </div>`;
    }
    return `<div class="stree-leaf">
      <span class="stree-short" title="${node.name}">${sn}</span><span class="stree-ns">${ns}</span>${badge}
    </div>`;
  }

  function flatten(nodes, path) {
    path = path || [];
    const out = [];
    for (const node of nodes) {
      const p = path.concat(node.name);
      out.push({ node, path: p });
      if (node.children && node.children.length) out.push(...flatten(node.children, p));
    }
    return out;
  }

  function showTree(data) {
    container.innerHTML = data.map(renderNode).join('');
    infoEl.textContent = '1,075 systems · 72 groups — click a group to expand';
  }

  function showSearch(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = flatData.filter(({ node }) => terms.every(t => node.name.toLowerCase().includes(t)));
    container.innerHTML = matches.map(({ node, path }) => {
      const sn = shortName(node.name);
      const ns = nsPrefix(node.name);
      const badge = `<span class="stree-badge ${badgeCls(node.type)}">${node.type}</span>`;
      const crumb = path.slice(0, -1).map(shortName).join(' › ');
      return `<div class="stree-flat-row">
        <div><span class="stree-short" title="${node.name}">${sn}</span><span class="stree-ns">${ns}</span>${badge}</div>
        ${crumb ? `<div class="stree-breadcrumb">${crumb}</div>` : ''}
      </div>`;
    }).join('');
    infoEl.textContent = `${matches.length} / 1,075 systems`;
  }

  container.addEventListener('click', e => {
    const row = e.target.closest('.stree-group-row');
    if (!row) return;
    const grp      = row.parentElement;
    const children = grp.querySelector('.stree-children');
    const arrow    = row.querySelector('.stree-arrow');
    const opening  = children.hidden;
    children.hidden = !opening;
    arrow.textContent = opening ? '▾' : '▸';
  });

  flatData = flatten(systemsTree);
  showTree(systemsTree);

  let timer;
  searchEl.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = searchEl.value.trim();
      if (q) showSearch(q);
      else showTree(systemsTree);
    }, 150);
  });
});
</script>

# System Update Tree

The ECS system update hierarchy for the V Rising server world (1.1). Systems within a group run in the order shown. Click a group to expand it.

<span style="font-size:0.82rem; color:var(--vp-c-text-3)">For an explanation of system types (Group, CSB, ISystem), see <a href="/VRising-Mod-Wiki/dev/reading-game-code#identifying-systems">Identifying Systems</a>.</span>

<div class="stree-wrap">
  <div class="stree-controls">
    <input class="stree-search" id="stree-search" placeholder="Search systems..." autocomplete="off" />
    <span class="stree-info" id="stree-info"></span>
  </div>
  <div id="stree-container" class="stree-container"></div>
</div>
