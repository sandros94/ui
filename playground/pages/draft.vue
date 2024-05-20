<template>
  <div class="bg-green-500/5 min-h-svh flex flex-col">
    <header class="bg-green-500/10 h-[--header-height] flex-none">
      Draft Header
    </header>
    <div class="grow bg-pink-500/5 flex">
      <div class="flex-none bg-red-500/10 w-72">
        Page:AsideLeft
      </div>
      <div class="grow flex flex-col">
        <div class="flex-none bg-yellow-500/10 h-24">
          Page:Top
        </div>
        <div class="grow bg-blue-500/5 relative">
          <span class="absolute">
            Page:Default
          </span>
          <main class="max-w-screen-lg h-full mx-auto bg-green-500/10 flex flex-col justify-around relative">
            <span class="absolute top-0 left-0">
              Main:Content
            </span>
            <div class="min-h-48 max-w-screen-md w-full mx-auto bg-red-500/15">
              <div v-for="i of 20" :key="i" class="text-7xl text-center">
                Content
              </div>
            </div>
            <div />
          </main>
        </div>
        <div class="flex-none bg-yellow-500/10 h-24">
          Page:Bottom
        </div>
      </div>
      <div class="flex-none bg-red-500/10 w-72">
        Page:AsideRight
      </div>
    </div>
    <footer class="h-96 bg-green-500/10">
      Draft Footer
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
