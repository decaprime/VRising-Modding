<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const prefabModules = import.meta.glob('/_data/prefabs/*.json')

const entries       = ref([])
const headers       = ref([])
const loading       = ref(true)
const search        = ref('')
const page          = ref(1)
const pageSize      = ref(50)
const typeFilter    = ref(null)
const typeOptions   = ref([])
const actFilter     = ref(null)
const actOptions    = ref([])
const regionFilter  = ref(null)
const regionOptions = ref([])

async function loadData(dataFile) {
  loading.value       = true
  search.value        = ''
  page.value          = 1
  entries.value       = []
  headers.value       = []
  typeFilter.value    = null
  typeOptions.value   = []
  actFilter.value     = null
  actOptions.value    = []
  regionFilter.value  = null
  regionOptions.value = []

  if (!dataFile) { loading.value = false; return }

  const key = `/_data/prefabs/${dataFile}.json`
  if (!prefabModules[key]) { loading.value = false; return }

  const mod  = await prefabModules[key]()
  const data = mod.default || mod

  if (Array.isArray(data)) {
    const hasRespawn   = data.some(row => typeof row[3] === 'number')
    const hasActRegion = data.some(row => row[4] != null || row[5] != null)
    const hdrs = ['Name', 'Prefab GUID', 'Type']
    if (hasRespawn)   hdrs.push('Respawn')
    if (hasActRegion) hdrs.push('Act', 'Region')
    headers.value = hdrs

    entries.value = data.map(row => {
      const m = row[0].match(/^(.*?)\s*\(([^)]+)\)\s*$/)
      const displayName = m ? m[1] : row[0]
      const alias       = m ? m[2] : undefined
      const respawn     = typeof row[3] === 'number' ? row[3] : null
      const act         = row[4] ?? null
      const region      = row[5] ?? null
      const out = [displayName, row[1], row[2]]
      if (hasRespawn)   out.push(respawn)
      if (hasActRegion) { out.push(act); out.push(region) }
      if (alias)        out.push(alias)
      return out
    })

    const typeIdx   = 2
    const actIdx    = hasRespawn ? 4 : 3
    const regionIdx = actIdx + 1

    const types = [...new Set(entries.value.map(r => r[typeIdx]).filter(Boolean))]
    if (types.length > 1) typeOptions.value = types

    if (hasActRegion) {
      const actOrder = ['ActI','ActII','ActIII','ActIV','Shards']
      const acts = [...new Set(entries.value.map(r => r[actIdx]).filter(Boolean))]
      actOptions.value = actOrder.filter(a => acts.includes(a))

      const regionOrder = ['Farbane','Dunley','CursedForest','Hallowed','Silverlight',
                           'GloomrotSouth','GloomrotNorth','Oakveil','Mortium']
      const allRegions = new Set()
      entries.value.forEach(r => {
        if (r[regionIdx]) r[regionIdx].split(', ').forEach(rg => allRegions.add(rg))
      })
      regionOptions.value = regionOrder.filter(rg => allRegions.has(rg))
    }
  } else {
    // { "PrefabName": numericId, ... }
    headers.value = ['Prefab Name', 'ID']
    entries.value = Object.entries(data)
  }

  loading.value = false
}

onMounted(() => loadData(frontmatter.value.data_file))
watch(() => frontmatter.value.data_file, (newFile) => loadData(newFile))

const actIdx    = computed(() => headers.value.indexOf('Act'))
const regionIdx = computed(() => headers.value.indexOf('Region'))

const filtered = computed(() => {
  const q   = search.value.toLowerCase().trim()
  const tf  = typeFilter.value
  const af  = actFilter.value
  const rf  = regionFilter.value
  const ai  = actIdx.value
  const ri  = regionIdx.value
  return entries.value.filter(row => {
    if (tf && row[2] !== tf) return false
    if (af && ai >= 0 && row[ai] !== af) return false
    if (rf && ri >= 0) {
      const r = row[ri]
      if (!r || !r.split(', ').includes(rf)) return false
    }
    if (q && !row.some(cell => String(cell).toLowerCase().includes(q))) return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize.value))

const rows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

watch([search, pageSize, typeFilter, actFilter, regionFilter], () => { page.value = 1 })

function fmtRespawn(secs) {
  if (!secs) return '—'
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return s ? `${m}m ${s}s` : `${m}m`
}

function fmtLabel(s) {
  if (!s) return s
  return s
    .replace(/^Act([IVX]+)$/, 'Act $1')
    .replace('GloomrotSouth', 'Gloomrot South')
    .replace('GloomrotNorth', 'Gloomrot North')
    .replace('CursedForest', 'Cursed Forest')
    .replace('Hallowed', 'Hallowed Mountains')
}
</script>

<template>
  <div>
    <p v-if="loading" style="color: var(--vp-c-text-2)">Loading prefabs…</p>

    <template v-else>
      <div class="pf-controls">
        <input
          v-model="search"
          class="pf-search"
          type="search"
          :placeholder="`Search ${entries.length} prefabs…`"
          aria-label="Search prefabs"
        />
        <div v-if="typeOptions.length" class="pf-type-filters">
          <button class="pf-type-btn" :class="{ active: typeFilter === null }" @click="typeFilter = null">All</button>
          <button v-for="t in typeOptions" :key="t" class="pf-type-btn" :class="{ active: typeFilter === t }" @click="typeFilter = t">{{ t }}</button>
        </div>
        <select v-if="actOptions.length" v-model="actFilter" class="cc-select">
          <option :value="null">All Acts</option>
          <option v-for="a in actOptions" :key="a" :value="a">{{ fmtLabel(a) }}</option>
        </select>
        <select v-if="regionOptions.length" v-model="regionFilter" class="cc-select">
          <option :value="null">All Regions</option>
          <option v-for="r in regionOptions" :key="r" :value="r">{{ fmtLabel(r) }}</option>
        </select>
        <select v-model="pageSize" class="cc-select">
          <option :value="50">50 / page</option>
          <option :value="100">100 / page</option>
          <option :value="250">250 / page</option>
        </select>
      </div>

      <p class="pf-info">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</p>

      <table class="pf-table" :aria-label="`${frontmatter.title} prefabs`">
        <thead>
          <tr>
            <th v-for="h in headers" :key="h">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row[0]">
            <td v-for="(cell, i) in row.slice(0, headers.length)" :key="i"
                :class="{
                  'pf-col-respawn': headers[i] === 'Respawn',
                  'pf-col-act':     headers[i] === 'Act',
                  'pf-col-region':  headers[i] === 'Region',
                }">
              <template v-if="headers[i] === 'Respawn'">{{ fmtRespawn(cell) }}</template>
              <template v-else-if="headers[i] === 'Region' && cell">
                <span v-for="rg in cell.split(', ')" :key="rg" class="pf-region-tag">{{ fmtLabel(rg) }}</span>
              </template>
              <template v-else>{{ cell ?? '—' }}</template>
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="headers.length" style="text-align:center; padding: 1.5rem; color: var(--vp-c-text-2);">
              No prefabs match your search.
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalPages > 1" class="cc-pagination">
        <button class="cc-page-btn" :disabled="page === 1" @click="page--">‹ Prev</button>
        <span style="font-size:0.82rem; color: var(--vp-c-text-2);">
          Page {{ page }} / {{ totalPages }}
        </span>
        <button class="cc-page-btn" :disabled="page === totalPages" @click="page++">Next ›</button>
      </div>
    </template>
  </div>
</template>
