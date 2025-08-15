<template>
  <div>
    <div class="flex flex-col gap-2 text-center py-10 justify-center">
      <div class="text-4xl font-black">Blog</div>
      <p class="text-lg">Notes, tips & tricks for my future self</p>
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 px-6 xl:px-20">
      <NuxtLink :to="blog.path" class="hover:cursor-pointer group flex flex-col" v-for="blog in blogs">
        <img class="mb-2 transition-all w-100 rounded-lg group-hover:brightness-105" :src="blog.previewImg" :alt="blog.title">
        <div class="transition-all group-hover:text-primary font-semibold text-lg">{{blog.title}}</div>
        <div class="mb-2">{{ blog.description }}</div>
        <div class="flex gap-x-2">
          <Tags v-model="blog.tags"></Tags>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: blogs } = await useAsyncData('blog', () => queryCollection('blog').order('order', 'ASC').all());
</script>