// Source: `https://github.com/nuxt/ui/blob/dev/src/runtime/plugins/colors.ts`
import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useNuxtApp, useHead } from '#imports'

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    return `:root {
  --header-height: ${appConfig.ui.s94.header.height};

  ${Object.entries(appConfig.ui.s94.light).map(([key, value]) => `--ui-s94-${key}: ${value};`).join('\n')}
}

.dark {
  ${Object.entries(appConfig.ui.s94.dark).map(([key, value]) => `--ui-s94-${key}: ${value};`).join('\n')}
}`
  })

  // Head
  const headData: any = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'nuxt-s94-ui'
    }]
  }

  // SPA mode
  if (process.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-nuxt-s94-ui', '')
    document.head.appendChild(style)

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-nuxt-s94-ui]\'))'
    }]
  }

  useHead(headData)
})
