<script setup lang="ts">
import type {Project} from "~/types/project";

defineProps<{
  portfolio: Project[],
  blog: Project[]
}>();
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink class="mr-auto font-semibold" to="/">Manos Miras</NuxtLink>
    <div class="border-b-gray-600 border-b my-3"/>
    <div class="flex flex-col gap-y-2">
      <NuxtLink to="#about" class="link text-sm">About</NuxtLink>
      <NuxtLink to="#portfolio" class="link text-sm">Portfolio</NuxtLink>
      <div>
        <ul>
          <li class="py-1" v-for="project in portfolio">
            <NuxtLink class="link text-gray-300" :to="project._path">{{ project.title }}</NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="#blog" class="text-sm">Blog</NuxtLink>
    </div>

    <div class="border-b-gray-600 border-b my-3"/>
    <div class="font-semibold text-sm">Blog</div>
    <ul>
      <li class="py-1" v-for="project in blog">
        <NuxtLink class="link text-gray-300" :to="project._path">{{ project.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>