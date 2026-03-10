<script setup>
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'

// Load all prefab JSONs eagerly just to get entry counts
const prefabModules = import.meta.glob('/_data/prefabs/*.json', { eager: true })

const categories = ref([])

onMounted(() => {
  const skip = new Set(['All', 'Remainders', 'VBloodNames'])
  const result = []

  for (const [path, mod] of Object.entries(prefabModules)) {
    const name = path.replace('/_data/prefabs/', '').replace('.json', '')
    if (skip.has(name)) continue

    const data  = mod.default || mod
    const count = Array.isArray(data) ? data.length : Object.keys(data).length
    result.push({ name, count })
  }

  categories.value = result.sort((a, b) => a.name.localeCompare(b.name))
})

const search   = ref('')
const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return categories.value
  return categories.value.filter(c => c.name.toLowerCase().includes(q))
})
</script>

<template>
  <div>
    <input
      v-model="search"
      class="pf-search"
      type="search"
      placeholder="Filter categories…"
      style="max-width: 300px; margin-bottom: 1.25rem;"
      aria-label="Filter prefab categories"
    />

    <div class="prefab-index-grid">
      <a
        v-for="cat in filtered"
        :key="cat.name"
        :href="withBase(`/prefabs/${cat.name}`)"
        class="prefab-index-card"
      >
        <strong>{{ cat.name }}</strong>
        <span class="prefab-index-count">({{ cat.count }})</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.prefab-index-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prefab-index-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  width: calc(33.33% - 0.5rem);
  min-width: 120px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: border-color 0.15s, background 0.15s;
}
.prefab-index-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand-1);
}

.prefab-index-count {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

@media (max-width: 640px) {
  .prefab-index-card { width: calc(50% - 0.5rem); }
}
</style>
