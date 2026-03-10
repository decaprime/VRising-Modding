---
title: Server Host Settings
parent: For Users
aside: false
---

<script setup>
import { onMounted, ref } from 'vue'
import serverHostSettings from '@data/serverHostSettings.json'

onMounted(() => {
  const searchEl  = document.getElementById('shs-search');
  const infoEl    = document.getElementById('shs-info');
  const toggleEl  = document.getElementById('shs-toggle-hidden');
  const container = document.getElementById('shs-container');

  let allData = [];
  let showHidden = false;

  const typeCls = { string: 'ss-type--string', int: 'ss-type--int', float: 'ss-type--float', bool: 'ss-type--bool', enum: 'ss-type--enum' };

  function shortDesc(s) {
    if (!s) return '';
    return s.length > 80 ? s.slice(0, 77) + '…' : s;
  }

  function renderRow(s) {
    const tc = typeCls[s.type] || '';
    const hiddenBadge = s.hidden ? '<span class="ss-badge ss-badge--hidden">hidden</span>' : '';
    const range = (s.min != null || s.max != null)
      ? `<span class="ss-range">${s.min != null ? s.min : '?'} – ${s.max != null ? s.max : '?'}</span>`
      : '';

    let detail = `<div class="ss-detail-desc">${s.description || ''}</div>`;

    if (s.enumValues && s.enumValues.length) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">Values</span><span>${s.enumValues.map(v => `<code>${v}</code>`).join(', ')}</span></div>`;
    }
    if (s.example) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">Example</span><code>${s.example}</code></div>`;
    }
    if (s.env && s.env.length) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">Env vars</span><span>${s.env.map(v => `<code>${v}</code>`).join('<br>')}</span></div>`;
    }
    if (s.cli && s.cli.length) {
      detail += `<div class="ss-detail-row"><span class="ss-detail-label">CLI params</span><span>${s.cli.map(v => `<code>${v}</code>`).join('<br>')}</span></div>`;
    }
    if (s.notes) {
      detail += `<div class="ss-detail-row ss-detail-note"><span class="ss-detail-label">Notes</span><span class="ss-note">${s.notes}</span></div>`;
    }

    return `
      <tr class="ss-row" data-key="${s.key}">
        <td class="ss-col-key"><code>${s.key}</code>${hiddenBadge}</td>
        <td><span class="ss-type ${tc}">${s.type}</span>${range}</td>
        <td class="ss-col-default"><code>${s.default ?? ''}</code></td>
        <td class="ss-col-desc">${shortDesc(s.description)}</td>
        <td class="ss-col-chevron"><span class="ss-chevron">›</span></td>
      </tr>
      <tr class="ss-detail-row" hidden>
        <td colspan="5"><div class="ss-detail-inner">${detail}</div></td>
      </tr>`;
  }

  function render(data) {
    const visible = showHidden ? data : data.filter(s => !s.hidden);
    const sections = [...new Set(visible.map(s => s.section))];
    container.innerHTML = sections.map(sec => {
      const rows = visible.filter(s => s.section === sec);
      return `<tr class="ss-section-row"><td colspan="5">${sec}</td></tr>` +
        rows.map(renderRow).join('');
    }).join('');

    const total = showHidden ? data.length : data.filter(s => !s.hidden).length;
    const hiddenCount = data.filter(s => s.hidden).length;
    infoEl.textContent = `${total} settings${showHidden ? '' : ` (${hiddenCount} hidden)`}`;
  }

  function filterAndRender(q, data) {
    if (!q) { render(data); return; }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = data.filter(s =>
      terms.every(t =>
        s.key.toLowerCase().includes(t) ||
        (s.description || '').toLowerCase().includes(t) ||
        (s.section || '').toLowerCase().includes(t)
      )
    );
    const visible = showHidden ? filtered : filtered.filter(s => !s.hidden);
    const sections = [...new Set(visible.map(s => s.section))];
    container.innerHTML = sections.map(sec => {
      const rows = visible.filter(s => s.section === sec);
      return `<tr class="ss-section-row"><td colspan="5">${sec}</td></tr>` +
        rows.map(renderRow).join('');
    }).join('');
    infoEl.textContent = `${visible.length} results`;
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

  toggleEl.addEventListener('click', () => {
    showHidden = !showHidden;
    toggleEl.textContent = showHidden ? 'Hide hidden settings' : 'Show hidden settings';
    const q = searchEl.value.trim();
    filterAndRender(q, allData);
  });

  let timer;
  searchEl.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => filterAndRender(searchEl.value.trim(), allData), 150);
  });

  allData = serverHostSettings;
  render(serverHostSettings);
});
</script>

# Server Host Settings

Settings for `ServerHostSettings.json`, which controls server infrastructure: networking, saves, RCON, and administration. See the [Server Configuration Overview](/user/server-configuration) for file locations.

You can include the full file or only the keys you want to override. Most settings can also be set via environment variables or command-line parameters. Expand a row to see them.

<div class="ss-wrap">
  <div class="ss-controls">
    <input class="ss-search" id="shs-search" placeholder="Search settings…" autocomplete="off" />
    <button class="ss-toggle-btn" id="shs-toggle-hidden">Show hidden settings</button>
    <span class="ss-info" id="shs-info"></span>
  </div>
  <div class="ss-table-wrap">
    <table class="ss-table">
      <thead>
        <tr>
          <th class="ss-col-key">Setting</th>
          <th class="ss-col-type">Type</th>
          <th class="ss-col-default">Default</th>
          <th class="ss-col-desc">Description</th>
          <th class="ss-col-chevron"></th>
        </tr>
      </thead>
      <tbody id="shs-container"></tbody>
    </table>
  </div>
</div>
