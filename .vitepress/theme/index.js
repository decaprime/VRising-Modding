import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CustomLayout from './CustomLayout.vue'
import PrefabIndex from './PrefabIndex.vue'
import OpenSourceMods from './OpenSourceMods.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    // Register as global components for inline use in .md files
    app.component('PrefabIndex',    PrefabIndex)
    app.component('OpenSourceMods', OpenSourceMods)
  },
}
