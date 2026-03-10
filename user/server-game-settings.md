---
title: Server Game Settings
parent: For Users
aside: false
---

<script setup>
import { onMounted, ref } from 'vue'
import serverGameSettings from '@data/serverGameSettings.json'

onMounted(() => {
  const searchEl  = document.getElementById('sgs-search');
  const infoEl    = document.getElementById('sgs-info');
  const container = document.getElementById('sgs-container');

  let allSections = [];

  const typeCls = { string: 'ss-type--string', int: 'ss-type--int', float: 'ss-type--float', bool: 'ss-type--bool', enum: 'ss-type--enum' };

  function renderRow(s) {
    const tc = typeCls[s.type] || '';
    const range = (s.min != null || s.max != null)
      ? `<span class="ss-range">${s.min != null ? s.min : '?'} – ${s.max != null ? s.max : '?'}</span>`
      : '';

    let detail = `<div class="ss-detail-desc">${s.description || ''}</div>`;

    if (s.uiName) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">UI name</span><span>${s.uiName}</span></div>`;
    }
    if (s.enumValues && s.enumValues.length) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">Values</span><span>${s.enumValues.map(v => `<code>${v}</code>`).join(', ')}</span></div>`;
    }
    if (s.notes) {
      detail += `<div class="ss-detail-row ss-detail-note"><span class="ss-detail-label">Note</span><span class="ss-note">${s.notes}</span></div>`;
    }

    return `
      <tr class="ss-row" data-key="${s.key}">
        <td class="ss-col-key"><code>${s.key}</code></td>
        <td><span class="ss-type ${tc}">${s.type}</span>${range}</td>
        <td class="ss-col-default"><code>${s.default ?? ''}</code></td>
        <td class="ss-col-chevron"><span class="ss-chevron">›</span></td>
      </tr>
      <tr class="ss-detail-row" hidden>
        <td colspan="4"><div class="ss-detail-inner">${detail}</div></td>
      </tr>`;
  }

  function render(sections) {
    let total = 0;
    container.innerHTML = sections.map(sec => {
      if (!sec.settings.length) return '';
      total += sec.settings.length;
      return `<tr class="ss-section-row"><td colspan="4">${sec.section}</td></tr>` +
        sec.settings.map(renderRow).join('');
    }).join('');
    infoEl.textContent = `${total} settings`;
  }

  function filterAndRender(q, sections) {
    if (!q) { render(sections); return; }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    let total = 0;
    container.innerHTML = sections.map(sec => {
      const filtered = sec.settings.filter(s =>
        terms.every(t =>
          s.key.toLowerCase().includes(t) ||
          (s.description || '').toLowerCase().includes(t) ||
          (s.uiName || '').toLowerCase().includes(t) ||
          sec.section.toLowerCase().includes(t)
        )
      );
      if (!filtered.length) return '';
      total += filtered.length;
      return `<tr class="ss-section-row"><td colspan="4">${sec.section}</td></tr>` +
        filtered.map(renderRow).join('');
    }).join('');
    infoEl.textContent = `${total} results`;
  }

  container.addEventListener('click', e => {
    const row = e.target.closest('tr.ss-row');
    if (!row) return;
    const detail = row.nextElementSibling;
    if (!detail || !detail.classList.contains('ss-detail-row')) return;
    const opening = detail.hidden;
    detail.hidden = !opening;
    row.classList.toggle('ss-open', opening);
    row.querySelector('.ss-chevron').textContent = opening ? '⌄' : '›';
  });

  let timer;
  searchEl.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => filterAndRender(searchEl.value.trim(), allSections), 150);
  });

  allSections = serverGameSettings;
  render(serverGameSettings);
});
</script>

# Server Game Settings

Settings for `ServerGameSettings.json`, which controls gameplay rules: combat, loot, building, castle limits, PvP scheduling, and more. See the [Server Configuration Overview](/user/server-configuration) for file locations.

You can include the full file or only the keys you want to override.

<div class="ss-wrap">
  <div class="ss-controls">
    <input class="ss-search" id="sgs-search" placeholder="Search settings…" autocomplete="off" />
    <span class="ss-info" id="sgs-info"></span>
  </div>
  <div class="ss-table-wrap">
    <table class="ss-table">
      <thead>
        <tr>
          <th class="ss-col-key">Setting</th>
          <th class="ss-col-type">Type</th>
          <th class="ss-col-default">Default</th>
          <th class="ss-col-chevron"></th>
        </tr>
      </thead>
      <tbody id="sgs-container"></tbody>
    </table>
  </div>
</div>
