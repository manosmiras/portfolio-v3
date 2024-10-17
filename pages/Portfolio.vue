<script setup lang="ts">
import Tag from "~/components/Tag.vue";

const { data } = await useAsyncData('portfolio', () => queryContent('/portfolio').find());

</script>

<template>
  <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
    <NuxtLink :to="project._path" class="hover:cursor-pointer group flex flex-col gap-y-1" v-for="project in data">
      <img class="transition-all w-100 rounded-lg group-hover:brightness-105" :src="project.previewImg" :alt="project.title">
      <div class="transition-all group-hover:text-primary font-semibold text-lg">{{project.title}}</div>
      <div class="">{{ project.description }}</div>
      <div class="flex gap-x-2">
        <TagList :tags="project.tags"></TagList>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>