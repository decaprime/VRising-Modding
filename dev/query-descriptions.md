---
title: Entity Query Descriptions
parent: For Developers
---

<script setup>
import { onMounted } from 'vue'
import queryDescriptions from '@data/queryDescriptions.json'

onMounted(() => {
  const PER_PAGE = 50;
  let allData = [];
  let filtered = [];
  let page = 0;

  function shortName(full) {
    const i = full.lastIndexOf('.');
    return i >= 0 ? full.substring(i + 1) : full;
  }

  function pill(name, cls) {
    return `<span class="eqd-pill ${cls}" title="${name}">${shortName(name)}</span>`;
  }

  function optionBadge(opt) {
    if (!opt || opt === 'Default') return '<span class="eqd-opt-default">Default</span>';
    return opt.split(',').map(o => `<span class="eqd-opt-flag">${o.trim()}</span>`).join(' ');
  }

  function render() {
    const tbody = document.getElementById('eqd-tbody');
    const info = document.getElementById('eqd-info');
    if (!tbody || !info) return;

    const start = page * PER_PAGE;
    const slice = filtered.slice(start, start + PER_PAGE);

    info.textContent = `${filtered.length.toLocaleString()} / ${allData.length.toLocaleString()} queries`;

    tbody.innerHTML = slice.map(row => {
      const sysName = shortName(row.system);
      const sysNs   = row.system.substring(0, row.system.lastIndexOf('.') + 1);
      const allPills  = row.all.map(c => pill(c, 'eqd-pill--all')).join('');
      const nonePills = row.none.map(c => pill(c, 'eqd-pill--none')).join('');
      return `<tr>
        <td class="eqd-col-system">
          <span class="eqd-sys-short" title="${row.system}">${sysName}</span>
          <span class="eqd-sys-ns">${sysNs}</span>
        </td>
        <td class="eqd-col-prop"><code>${row.property}</code></td>
        <td class="eqd-col-components">${allPills}${nonePills}</td>
        <td class="eqd-col-options">${optionBadge(row.options)}</td>
      </tr>`;
    }).join('');

    renderPagination();
  }

  function renderPagination() {
    const container = document.getElementById('eqd-pagination');
    if (!container) return;
    const total = Math.ceil(filtered.length / PER_PAGE);
    if (total <= 1) { container.innerHTML = ''; return; }

    let pages = [];
    if (total <= 7) {
      pages = Array.from({ length: total }, (_, i) => i);
    } else {
      pages = [0];
      let lo = Math.max(1, page - 2), hi = Math.min(total - 2, page + 2);
      if (lo > 1) pages.push('...');
      for (let i = lo; i <= hi; i++) pages.push(i);
      if (hi < total - 2) pages.push('...');
      pages.push(total - 1);
    }

    container.innerHTML = [
      `<button class="eqd-page-btn" ${page === 0 ? 'disabled' : ''} data-p="${page - 1}">&#8592;</button>`,
      ...pages.map(p => p === '...'
        ? `<span class="eqd-page-ellipsis">…</span>`
        : `<button class="eqd-page-btn ${p === page ? 'active' : ''}" data-p="${p}">${p + 1}</button>`),
      `<button class="eqd-page-btn" ${page >= total - 1 ? 'disabled' : ''} data-p="${page + 1}">&#8594;</button>`
    ].join('');

    container.querySelectorAll('[data-p]').forEach(btn => {
      btn.addEventListener('click', () => {
        page = parseInt(btn.dataset.p);
        render();
        window.scrollTo(0, 0);
      });
    });
  }

  function applyFilter(q) {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    filtered = terms.length
      ? allData.filter(row => {
          const hay = [row.system, row.property, ...row.all, ...row.none, ...row.any, row.options].join(' ').toLowerCase();
          return terms.every(t => hay.includes(t));
        })
      : allData;
    page = 0;
    render();
  }

  allData = queryDescriptions;
  filtered = queryDescriptions;
  render();

  const search = document.getElementById('eqd-search');
  if (!search) return;
  let timer;
  search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => applyFilter(search.value), 150);
  });
});
</script>

# Entity Query Descriptions

All `EntityQuery` objects registered by game systems, generated from 1.1 game data. Use this to find which system watches a given component, or to identify the query property to access in a Harmony patch.

<div class="eqd-wrap">
  <div class="eqd-controls">
    <input class="eqd-search" id="eqd-search" placeholder="Filter by system or component..." autocomplete="off" />
    <span class="eqd-info" id="eqd-info"></span>
  </div>
  <div class="eqd-table-wrap">
    <table class="eqd-table">
      <thead>
        <tr>
          <th class="eqd-col-system">System</th>
          <th class="eqd-col-prop">Query Property</th>
          <th class="eqd-col-components">Components</th>
          <th class="eqd-col-options">Options</th>
        </tr>
      </thead>
      <tbody id="eqd-tbody"></tbody>
    </table>
  </div>
  <div class="eqd-pagination" id="eqd-pagination"></div>
</div>
