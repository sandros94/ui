<template>
  <div class="bg-green-500/5 min-h-svh flex flex-col overflow-x-hidden">
    <header class="bg-green-500/10 h-[--header-height] flex-none">
      Draft Header - <NuxtLink class="text-blue-500 underline" to="/">
        Home
      </NuxtLink>
    </header>
    <div class="bg-pink-500/5 grow flex flex-col lg:flex-row">
      <div class="bg-red-500/10 flex-none max-lg:w-full lg:w-72">
        Page:Left
      </div>
      <div class="grow max-lg:order-last flex flex-col">
        <div class="bg-yellow-500/10 h-24 flex-none">
          Page:Top
        </div>
        <div class="bg-blue-500/5 grow relative">
          <span class="absolute">
            Page:Default
          </span>
          <main class="bg-green-500/10 max-w-breakpoint-lg h-full mx-auto flex flex-col justify-around relative">
            <span class="absolute top-0 left-0">
              Main:Content
            </span>
            <div class="bg-red-500/15 min-h-48 max-w-breakpoint-md w-full mx-auto">
              <div v-for="i of 20" :key="i" class="text-7xl text-center">
                Content
              </div>
            </div>
            <div />
          </main>
        </div>
        <div class="bg-yellow-500/10 h-24 flex-none">
          Page:Bottom
        </div>
      </div>
      <div class="bg-red-500/10 max-lg:text-right flex-none max-lg:w-full lg:w-72">
        Page:Right
      </div>
    </div>
    <footer class="bg-green-500/10 h-96 flex-none">
      Draft Footer
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
