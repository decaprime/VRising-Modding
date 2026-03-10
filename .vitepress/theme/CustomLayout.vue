<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import ConsoleCommandsTable from './ConsoleCommandsTable.vue'
import PrefabTable from './PrefabTable.vue'

const Layout = DefaultTheme.Layout
const { frontmatter } = useData()
const customLayout = computed(() => frontmatter.value.customLayout)
</script>

<template>
  <Layout>
    <!-- Inject two-line "V Rising / Mod Wiki" title into the nav bar -->
    <template #nav-bar-title-after>
      <div class="wr-nav-title">
        <span class="wr-nav-line1">V Rising</span>
        <span class="wr-nav-line2">Mod Wiki</span>
      </div>
    </template>

    <template #doc-before>
      <ConsoleCommandsTable v-if="customLayout === 'console_commands'" />
      <PrefabTable v-else-if="customLayout === 'prefab'" />
    </template>
  </Layout>
</template>
