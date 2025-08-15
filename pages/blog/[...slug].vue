<template>
  <main v-if="page" class="flex flex-col gap-2">
    <img
        class="self-center block h-auto w-auto max-h-[50vh] max-w-full rounded-lg transition-all group-hover:brightness-105"
        :src="page.headerImg"
        :alt="page.title"
    />

    <div class="flex gap-x-4 items-start justify-between">
      <div>
        <h1 class="font-bold text-4xl">
          {{ page.title }}
        </h1>
        <p class="description text-xl">{{ page.description }}</p>
      </div>
      <Tags class="pt-1" v-model="page.tags"></Tags>
    </div>
    <ContentRenderer v-if="page" :value="page"/>
  </main>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {definePageMeta} from "#imports";

definePageMeta({
  layout: 'project',
});
const route = useRoute();
const {data: page} = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first());
</script>

<style scoped>

:deep(img) {
  @apply my-2;
}

:deep(p:not(.description)) {
  @apply mb-2;
}
</style>