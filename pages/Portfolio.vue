<script setup lang="ts">
const { data } = await useAsyncData('home', () => queryContent('/portfolio').find());
// console.log(data);

</script>

<template>
  <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6">
    <NuxtLink :to="project._path" class="hover:cursor-pointer group flex flex-col gap-y-1" v-for="project in data">
      <img class="transition-all w-100 rounded-lg group-hover:brightness-105" :src="project.previewImg" :alt="project.title">
      <div class="transition-all group-hover:text-primary font-semibold text-lg">{{project.title}}</div>
      <div class="">{{project.description}}</div>
      <div class="flex gap-x-2">
        <div class="truncate text-xs rounded-lg bg-tag px-2 py-1" v-for="tag in project.tags">
          {{ tag }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>