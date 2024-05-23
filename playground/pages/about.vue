<template>
  <div class="max-w-full w-full">
    <SHero
      :cta="[
        {
          label: 'Install it now',
          size: 'xl',
          trailingIcon: 'i-ph-arrow-right',
        },
      ]"
      headline="Welcome to s94/ui"
      subhead="This is a custom Nuxt layer that extends Nuxt UI's components."
      variant="opening"
      img="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside"
      img-alt="Hero image"
    />
    <SArticle :headline="headline.toUpperCase()" :value="loremIpsum?.split(/\r?\n/).filter(e => e)">
      <template #headline="{ value, hUi }">
        <SHeadline :value="value" :ui="hUi">
          <template #span-0="{ value: v }">
            <SHeadlineSpan class="text-green-500" :value="v" />
          </template>
          <template #span-2="{ value: v }">
            <SHeadlineSpan class="text-primary-500" :value="v" />
          </template>
        </SHeadline>
      </template>
      <template #paragraph-1="{ value, pClass }">
        <p class="text-blue-500" :class="pClass">
          {{ value }}
        </p>
      </template>
    </SArticle>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'faded',
})

const headline = ref(`In typography
sometimes, it is important to give
different weights
to different types of content!`)
</script>
