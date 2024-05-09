// Source: `https://github.com/nuxt/ui/blob/dev/src/runtime/plugins/colors.ts`
import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp } from '#imports'

export default defineNuxtPlugin(() => {
  const { s94Ui } = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    return `:root {
  --header-height: ${s94Ui.header.height};

  ${Object.entries(s94Ui.light).map(([key, value]) => `--s94-ui-${key}: ${value};`).join('\n')}
}

.dark {
  ${Object.entries(s94Ui.dark).map(([key, value]) => `--s94-ui-${key}: ${value};`).join('\n')}
}`
  })

  // Head
  const headData: any = {
    style: [{
      id: 'nuxt-s94-ui',
      innerHTML: () => root.value,
      tagPriority: -2,
    }],
  }

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-nuxt-s94-ui', '')
    document.head.appendChild(style)

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-nuxt-s94-ui]\'))',
    }]
  }

  useHead(headData)
})
