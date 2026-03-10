<script setup>
import { ref, computed, watch } from 'vue'
import allCommands from '@data/consoleCommands.json'

// ── filters ────────────────────────────────────────────────
const search      = ref('')
const userFilter  = ref('all')   // 'all' | 'Player' | 'Admin'
const hiddenFilter = ref('all')  // 'all' | 'visible' | 'hidden'
const pageSize    = ref(20)
const page        = ref(1)

// ── derived data ────────────────────────────────────────────
const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()

  return allCommands.filter(cmd => {
    if (q) {
      const inName = cmd.name.toLowerCase().includes(q)
      const inDesc = (cmd.description || '').toLowerCase().includes(q)
      const inArgs = (cmd.args || []).some(a =>
        (a.name || '').toLowerCase().includes(q)
      )
      if (!inName && !inDesc && !inArgs) return false
    }

    if (userFilter.value !== 'all' && cmd.user !== userFilter.value) return false
    if (hiddenFilter.value === 'hidden'  && !cmd.hidden) return false
    if (hiddenFilter.value === 'visible' &&  cmd.hidden) return false

    return true
  })
})

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize.value))

const rows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur   = page.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const start = Math.max(1, Math.min(cur - 2, total - 4))
  return Array.from({ length: Math.min(5, total) }, (_, i) => start + i)
})

watch([search, userFilter, hiddenFilter, pageSize], () => { page.value = 1 })

// ── per-row expand state ─────────────────────────────────────
const expandedDescs  = ref(new Set())
const expandedNotes  = ref(new Set())
const expandedArgs   = ref(new Set())   // key: "cmdName::argName"

function toggleDesc(name) {
  const s = new Set(expandedDescs.value)
  s.has(name) ? s.delete(name) : s.add(name)
  expandedDescs.value = s
}

function toggleNote(name, e) {
  e.stopPropagation()
  const s = new Set(expandedNotes.value)
  s.has(name) ? s.delete(name) : s.add(name)
  expandedNotes.value = s
}

function toggleArg(cmdName, argName, e) {
  e.stopPropagation()
  const key = `${cmdName}::${argName}`
  const s = new Set(expandedArgs.value)
  s.has(key) ? s.delete(key) : s.add(key)
  expandedArgs.value = s
}

function argKey(cmdName, argName) {
  return `${cmdName}::${argName}`
}

function hasExpansion(cmd) {
  if (expandedNotes.value.has(cmd.name)) return true
  return (cmd.args || []).some(a => expandedArgs.value.has(argKey(cmd.name, a.name)))
}
</script>

<template>
  <div class="cc-wrap">
    <!-- ── Controls ── -->
    <div class="cc-controls">
      <input
        v-model="search"
        class="cc-search"
        type="search"
        placeholder="Search commands, descriptions, arguments…"
        aria-label="Search console commands"
      />

      <select v-model="userFilter" class="cc-select" aria-label="Filter by user type">
        <option value="all">All users</option>
        <option value="Player">Player</option>
        <option value="Admin">Admin</option>
      </select>

      <select v-model="hiddenFilter" class="cc-select" aria-label="Filter by visibility">
        <option value="all">All visibility</option>
        <option value="visible">Visible</option>
        <option value="hidden">Hidden</option>
      </select>

      <select v-model="pageSize" class="cc-select" aria-label="Rows per page">
        <option :value="10">10 / page</option>
        <option :value="20">20 / page</option>
        <option :value="50">50 / page</option>
        <option :value="100">100 / page</option>
      </select>

      <span class="cc-info">
        {{ filtered.length }} command{{ filtered.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <!-- ── Table ── -->
    <table class="cc-table" aria-label="Console Commands">
      <colgroup>
        <col class="cc-col-cmd" />
        <col class="cc-col-user" />
        <col class="cc-col-hid" />
        <col class="cc-col-args" />
        <col class="cc-col-desc" />
      </colgroup>
      <thead>
        <tr>
          <th class="cc-col-cmd">Command</th>
          <th class="cc-col-user">User</th>
          <th class="cc-col-hid">Hidden</th>
          <th class="cc-col-args">Arguments</th>
          <th class="cc-col-desc">Description</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="cmd in rows" :key="cmd.name">

          <!-- ── Main data row ── -->
          <tr :class="{ 'cc-row-has-expansion': hasExpansion(cmd) }">

            <!-- Command name + optional note toggle -->
            <td class="cc-col-cmd">
              <code class="cc-cmd-code" :title="cmd.name">{{ cmd.name }}</code>
              <button
                v-if="cmd.note"
                class="cc-note-btn"
                :class="{ 'cc-note-btn--active': expandedNotes.has(cmd.name) }"
                :title="expandedNotes.has(cmd.name) ? 'Hide note' : 'Show note'"
                :aria-expanded="expandedNotes.has(cmd.name)"
                @click="toggleNote(cmd.name, $event)"
              >⚠</button>
            </td>

            <!-- User -->
            <td
              class="cc-col-user"
              :class="cmd.user === 'Admin' ? 'badge-admin' : 'badge-player'"
            >{{ cmd.user }}</td>

            <!-- Hidden -->
            <td class="cc-col-hid">
              <span v-if="cmd.hidden"  class="cc-icon-visible" title="Hidden command">✓</span>
              <span v-else             class="cc-icon-hidden"  title="Visible command">✗</span>
            </td>

            <!-- Arguments: pills only, click to expand below -->
            <td class="cc-col-args">
              <div v-if="cmd.args && cmd.args.length" class="cc-arg-wrap">
                <span
                  v-for="arg in cmd.args"
                  :key="arg.name"
                  class="cc-arg-pill"
                  :class="{ 'cc-arg-pill--active': expandedArgs.has(argKey(cmd.name, arg.name)) }"
                  @click="toggleArg(cmd.name, arg.name, $event)"
                >{{ arg.name || 'Unnamed Argument' }}</span>
              </div>
              <span v-else class="cc-icon-hidden">—</span>
            </td>

            <!-- Description -->
            <td
              class="cc-col-desc"
              @click="cmd.description ? toggleDesc(cmd.name) : null"
            >
              <span
                v-if="cmd.description"
                class="cc-desc-text"
                :class="{ expanded: expandedDescs.has(cmd.name) }"
                :title="cmd.description"
              >{{ cmd.description }}</span>
            </td>
          </tr>

          <!-- ── Full-width expansion row ── -->
          <tr v-if="hasExpansion(cmd)" class="cc-expand-row">
            <td colspan="5" class="cc-expand-cell">

              <!-- Note -->
              <div v-if="expandedNotes.has(cmd.name) && cmd.note" class="cc-expand-section cc-expand-note">
                <span class="cc-expand-label">⚠ Note</span>
                <span>{{ cmd.note }}</span>
              </div>

              <!-- One section per expanded argument -->
              <template v-for="arg in cmd.args" :key="arg.name">
                <div
                  v-if="expandedArgs.has(argKey(cmd.name, arg.name))"
                  class="cc-expand-section"
                >
                  <div class="cc-expand-arg-header">
                    <code>{{ arg.name || 'Unnamed Argument' }}</code>
                    <span class="cc-expand-badge">{{ arg.type || '' }}</span>
                    <span class="cc-expand-badge" :class="arg.required ? 'cc-expand-badge--req' : ''">
                      {{ arg.required ? 'Required' : 'Optional' }}
                    </span>
                  </div>
                  <div v-if="arg.description" class="cc-expand-arg-desc">{{ arg.description }}</div>
                  <div v-if="arg.suggestions && arg.suggestions.length" class="cc-expand-arg-suggestions">
                    <span class="cc-expand-label">Suggestions:</span>
                    {{ arg.suggestions.map(s => s.text).join(', ') }}
                  </div>
                </div>
              </template>

            </td>
          </tr>

        </template>

        <!-- empty state -->
        <tr v-if="rows.length === 0">
          <td colspan="5" style="text-align:center; padding: 2rem; color: var(--vp-c-text-2);">
            No commands match your search.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ── Pagination ── -->
    <div v-if="totalPages > 1" class="cc-pagination">
      <button class="cc-page-btn" :disabled="page === 1" @click="page = 1" aria-label="First page">«</button>
      <button class="cc-page-btn" :disabled="page === 1" @click="page--" aria-label="Previous page">‹</button>

      <button v-if="pageNumbers[0] > 1" class="cc-page-btn" disabled>…</button>

      <button
        v-for="n in pageNumbers"
        :key="n"
        class="cc-page-btn"
        :class="{ active: n === page }"
        @click="page = n"
      >{{ n }}</button>

      <button v-if="pageNumbers[pageNumbers.length - 1] < totalPages" class="cc-page-btn" disabled>…</button>

      <button class="cc-page-btn" :disabled="page === totalPages" @click="page++" aria-label="Next page">›</button>
      <button class="cc-page-btn" :disabled="page === totalPages" @click="page = totalPages" aria-label="Last page">»</button>
    </div>
  </div>
</template>
