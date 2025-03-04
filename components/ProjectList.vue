<script setup lang="ts">
import type {Project} from "~/types/project";

defineProps<{
  portfolio: Project[],
  blog: Project[]
}>();
</script>

<template>
  <div>
    <div class="font-semibold text-sm">Portfolio</div>
    <ul>
      <li class="py-1" v-for="project in portfolio">
        <NuxtLink class="link text-gray-300" :to="project._path">{{ project.title }}</NuxtLink>
      </li>
    </ul>
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