<template>
  <div>
    <div class="flex flex-col min-h-screen ">
      <Header class="bg-page sticky w-full top-0 z-50 px-20" />
      <div class="lg:px-52 md:px-32 sm:px-6 h-100">
        <div>
          <ProjectList v-if="portfolio && blog" :portfolio="portfolio" :blog="blog" class="fixed top-28 left-52 w-48"/>
          <div class="mx-60 py-2">
            <slot/>
          </div>
          <TableOfContents v-if="toc" class="fixed top-28 right-52" :toc="toc"/>
        </div>
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
    () => {
      const segments = route.path.split('/').filter(Boolean);
      const collection = segments[0] as "blog" | "portfolio";
      return queryCollection(collection).path(route.path).first();
    }
);
const toc = computed(() => project.value?.body?.toc);
const { data: portfolio } = await useAsyncData('portfolio', () => queryCollection('portfolio').order('order', 'ASC').all());
const { data: blog } = await useAsyncData('blog', () => queryCollection('blog').order('order', 'ASC').all());
</script>