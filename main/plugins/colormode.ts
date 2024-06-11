// Source: `https://github.com/nuxt/ui/blob/dev/src/runtime/plugins/colors.ts`
import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useHead } from '#imports'

export default defineNuxtPlugin(({ isHydrating, payload: { serverRendered } }) => {
  const { header: { height }, light, dark } = useAppConfig().s94Ui

  const root = computed(() => {
    return `:root {
  --header-height: ${height};

  ${Object.entries(light).map(([key, value]) => `--s94-ui-${key}: ${value};`).join('\n')}
}

.dark {
  ${Object.entries(dark).map(([key, value]) => `--s94-ui-${key}: ${value};`).join('\n')}
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
  if (import.meta.client && isHydrating && !serverRendered) {
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
