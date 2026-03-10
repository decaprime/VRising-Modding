<script setup>
import { computed } from 'vue'
import allMods from '@data/OpenSourceMods.json'

// Mod name lists — same as the Jekyll Liquid assigns
const SERVER_MODS = new Set(['KindredCommands','Bloodcraft','XPRising','KindredPortals',
  'AutoBrazier','KindredLogistics','KindredSchematics','Gator_Bounty','BloodyBoss',
  'Sanguis','BloodyEncounters','BloodyWallet','RaidGuard','Protector','BloodyRewards',
  'JewelCreator','ShardExtraLife','CoffinSleep','BloodyShop','BloodyMailBox',
  'BloodyPoint','BloodyMerchant','Notify','AutoCloseDoors','StarterKit','KindredArenas',
  'MuteChatPlayer','BetterMissions','BloodRefill','SpiderKiller'])

const CLIENT_MODS = new Set(['ClientUI','RemoveVersionWatermark','Eclipse'])

const FRAMEWORK_MODS = new Set(['Bloodstone','VampireCommandFramework','CrimsonSQL',
  'BloodyCore','XPShared'])

function filterMods(nameSet) {
  const seen = new Set()
  return allMods
    .filter(m => nameSet.has(m.name) && !m.is_deprecated)
    .filter(m => {
      const key = `${m.name}__${m.owner}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map(m => ({ ...m, latest: m.versions[0] }))
}

const serverMods    = computed(() => filterMods(SERVER_MODS))
const clientMods    = computed(() => filterMods(CLIENT_MODS))
const frameworkMods = computed(() => filterMods(FRAMEWORK_MODS))
</script>

<template>
  <div>
    <template v-for="[label, mods] in [['Server Mods', serverMods], ['Client Mods', clientMods], ['Frameworks', frameworkMods]]" :key="label">
      <h2>{{ label }}</h2>
      <table class="pf-table">
        <thead>
          <tr>
            <th>Mod Name</th>
            <th>Description</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mod in mods" :key="`${mod.name}-${mod.owner}`">
            <td>
              <a :href="mod.latest.website_url" target="_blank" rel="noopener">
                {{ mod.name }}
              </a>
            </td>
            <td>{{ mod.latest.description }}</td>
            <td>
              <a :href="`https://thunderstore.io/c/v-rising/p/${mod.owner}`" target="_blank" rel="noopener">
                {{ mod.owner }}
              </a>
            </td>
          </tr>
          <tr v-if="mods.length === 0">
            <td colspan="3" style="color: var(--vp-c-text-2); text-align: center;">No mods found.</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
