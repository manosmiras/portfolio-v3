<template>
  <div>
    <div class="flex flex-col gap-2 text-center py-10 justify-center">
      <div class="text-4xl font-black">Portfolio</div>
      <p class="text-lg">A mix of professional & private projects I've worked on</p>
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 px-6 xl:px-20">
      <NuxtLink :to="project.path" class="hover:cursor-pointer group flex flex-col" v-for="project in portfolio">
        <img class="mb-2 transition-all w-100 rounded-lg group-hover:brightness-105" :src="project.previewImg" :alt="project.title">
        <div class="transition-all group-hover:text-primary font-semibold text-lg">{{project.title}}</div>
        <div class="mb-2">{{ project.description }}</div>
        <div class="flex gap-x-2">
          <Tags v-model="project.tags"></Tags>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: portfolio } = await useAsyncData('portfolio', () => queryCollection('portfolio').order('order', 'ASC').all());
</script>