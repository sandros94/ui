<template>
  <div>
    <SHeader
      :links="links"
      :socials="socials"
      :style="{ top: navPosition }"
      class="transition-all duration-300 ease-in-out"
      disable-socials
      sticky
      variant="rtl"
    />
    <NuxtLayout name="app">
      <slot />
    </NuxtLayout>
    <SFooter
      :divider-avatar="{ src: 'https://avatars.githubusercontent.com/u/13056429?v=4', size: 'lg' }"
      :links="linksGroup"
      :socials="socials"
    >
      <template #legal>
        <div>
          © 1994-{{ new Date().getFullYear() }}, Grown up by
          <NuxtLink class="underline underline-offset-2" target="_blank" to="https://github.com/sandros94">
            <span>Sandros94</span>
          </NuxtLink>
          & parents
        </div>
      </template>
    </SFooter>
  </div>
</template>

<script setup lang="ts">
import type { Links, LinksGroup } from '#s94-ui/types'

const links = useState<Links | undefined>('links')
const socials = useState<Links | undefined>('socials')
const linksGroup = useState<LinksGroup[] | undefined>('linksGroup')

const navPosition = ref<string>('0')
const { isScrolling, directions } = useScroll(window)
const { top: toTop, bottom: toBottom } = toRefs(directions)
watch([toTop, toBottom], () => {
  if (isScrolling.value && toTop.value) {
    navPosition.value = '0'
  }
  else if (isScrolling.value && toBottom.value) {
    navPosition.value = 'calc(var(--header-height) * -1)'
  }
})
</script>
