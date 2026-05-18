<template>
  <main v-if="page" class="flex flex-col gap-2">
    <img
        class="self-center block h-auto w-auto max-h-[50vh] max-w-full rounded-lg transition-all group-hover:brightness-105"
        :src="page.headerImg"
        :alt="page.title"
    />
    <div class="flex gap-x-4 items-stretch justify-between">
      <div>
        <h1 class="font-bold text-4xl mb-1">
          {{ page.title }}
        </h1>
        <p class="description">{{ page.description }}</p>
      </div>
      <div class="pt-1 flex flex-col gap-y-1 items-stretch">
        <NuxtLink class="ml-auto mt-auto text-sm text-primary hover:cursor-pointer" v-if="page.repositoryUrl" :to="page.repositoryUrl" target="_blank">{{ page.repositoryUrl }}</NuxtLink>
        <Tags class="mt-auto" v-model="page.tags"></Tags>
      </div>

    </div>
    <ContentRenderer class="content" v-if="page" :value="page"/>
  </main>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {definePageMeta} from "#imports";

definePageMeta({
  layout: 'project',
});

const route = useRoute();
const {data: page} = await useAsyncData(route.path, () => queryCollection('portfolio').path(route.path).first());

useHead({
  title: page.value?.title,
  meta:[{name: 'description', content: page.value?.description}]
});
</script>
