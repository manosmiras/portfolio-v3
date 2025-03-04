<template>
  <div>
    <div class="flex flex-col gap-2 text-center py-10 justify-center">
      <div class="text-4xl font-black text-primary">Blog</div>
      <div class="text-lg">My personal knowledge vault. Explore freely, something here might spark your interest.</div>
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 px-20">
      <NuxtLink :to="project._path" class="hover:cursor-pointer group flex flex-col gap-y-1" v-for="project in data">
        <img class="transition-all w-100 rounded-lg group-hover:brightness-105" :src="project.previewImg" :alt="project.title">
        <div class="transition-all group-hover:text-primary font-semibold text-lg">{{project.title}}</div>
        <div class="">{{ project.description }}</div>
        <div class="flex gap-x-2">
          <TagList :tags="project.tags"></TagList>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('blog', () => queryContent('/blog').find());

</script>