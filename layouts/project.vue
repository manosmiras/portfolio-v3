<template>
  <div>
    <div class="flex flex-col min-h-screen lg:px-52 md:px-32 sm:px-6 h-100">
      <Header class="sticky top-0 z-50 bg-page" />
      <div>
        <ProjectList v-if="portfolio && blog" :portfolio="portfolio" :blog="blog" class="fixed top-28 left-52 z-50 w-48"/>
        <div class="mx-60 py-2">
          <slot/>
        </div>
        <TableOfContents v-if="toc" class="fixed top-28 right-52 z-50" :toc="toc"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "#vue-router";
import {useAsyncData} from "#app";

const route = useRoute();
const { data: project } = await useAsyncData(
    () => `project-${route.path}`, // reactive key
    () => queryCollection('portfolio').path(route.path).first()
);
const toc = computed(() => project.value?.body?.toc);
const { data: portfolio } = await useAsyncData('portfolio', () => queryCollection('portfolio').all());
const { data: blog } = await useAsyncData('blog', () => queryCollection('blog').all());
</script>