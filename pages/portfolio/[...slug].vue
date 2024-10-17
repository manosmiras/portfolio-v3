<script setup lang="ts">
import {useRoute} from 'vue-router';

const route = useRoute();
const slug = route.params.slug[0];
const {data} = await useAsyncData('project', () => queryContent(`/portfolio/${slug}`).findOne());
</script>

<template>
  <main>
    <div class="flex gap-x-40">
      <div> left header</div>
      <div>
        <h1 class="font-bold text-4xl mb-2">
          {{ data.title }}
        </h1>
        <img class="transition-all w-100 rounded-lg group-hover:brightness-105" :src="data.previewImg" :alt="data.title">
        <ContentDoc/>
      </div>
      <div>table of contents</div>
    </div>
  </main>
</template>

<style scoped>
:deep(h2) {
  @apply text-2xl font-bold pt-6 mt-6 mb-2 border-t border-t-secondary;
}

:deep(h3) {
  @apply text-xl font-bold pt-3 mt-3 mb-2;
}
</style>
