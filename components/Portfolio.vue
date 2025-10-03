<template>
  <div>
    <div class="flex flex-col gap-2 text-center py-10 justify-center">
      <div class="text-4xl font-black">Portfolio</div>
      <p class="text-lg">A mix of professional & personal projects I've worked on</p>
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-6 px-6 xl:px-20">
      <NuxtLink
          v-for="project in portfolio"
          :key="project.path"
          :to="project.path"
          class="hover:cursor-pointer group flex flex-col"
      >
        <div class="aspect-video lg:max-h-[28vh] overflow-hidden rounded-lg">
          <img
              :src="project.previewImg"
              :alt="project.title"
              class="h-full w-full object-cover object-center transition-all group-hover:brightness-105"
          />
        </div>
        <div class="mt-2 transition-all group-hover:text-primary font-semibold text-lg">
          {{ project.title }}
        </div>
        <div class="mb-2">{{ project.description }}</div>
        <div class="flex gap-x-2">
          <Tags v-model="project.tags" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: portfolio } = await useAsyncData('portfolio', () => queryCollection('portfolio').order('order', 'ASC').all());
</script>