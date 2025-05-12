<script setup lang="ts">
import {useRoute} from 'vue-router';
import {definePageMeta} from "#imports";

definePageMeta({
  layout: 'project',
});

const route = useRoute();
const slug = route.params.slug[0];
const { data } = await useAsyncData('project', () => queryContent(`/portfolio/${slug}`).findOne());
// console.log(data.value.body.toc);
</script>

<template>
  <main class="flex flex-col gap-2">
    <img class="transition-all w-100 rounded-lg group-hover:brightness-105" :src="data.previewImg" :alt="data.title">
    <div class="flex gap-x-4 items-start justify-between">
      <div>
        <h1 class="font-bold text-4xl">
          {{ data.title }}
        </h1>
        <p class="description text-xl">{{data.description}}</p>
      </div>
      <Tags class="pt-1" v-model="data.tags"></Tags>
    </div>
    <ContentDoc/>
  </main>
</template>

<style scoped>
:deep(h2) {
  @apply text-2xl font-bold pt-6 mt-6 mb-2 border-t border-t-secondary;
}

:deep(h3) {
  @apply text-xl font-bold pt-3 mt-3 mb-2;
}

:deep(img) {
  @apply my-2;
}

:deep(p:not(.description)) {
  @apply mb-2;
}
</style>
