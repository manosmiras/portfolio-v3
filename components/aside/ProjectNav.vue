<template>
  <div>
    <div class="font-semibold text-sm">Portfolio</div>
    <ul>
      <li class="py-1" v-for="project in portfolio">
        <NuxtLink
            class="link text-gray-300"
            :to="project.externalUrl || project.path"
            :target="project.externalUrl ? '_blank' : '_self'"
        >
          {{ project.title }}
        </NuxtLink>
      </li>
    </ul>
    <div class="border-b-gray-600 border-b my-3"/>
    <div class="font-semibold text-sm">Blog</div>
    <ul>
      <li class="py-1" v-for="project in blog">
        <NuxtLink class="link text-gray-300" :to="project.path">{{ project.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioCollectionItem, BlogCollectionItem } from '@nuxt/content';

defineProps<{
  portfolio: PortfolioCollectionItem[],
  blog: BlogCollectionItem[]
}>();
</script>