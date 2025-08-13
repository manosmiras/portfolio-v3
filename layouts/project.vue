<template>
  <div class="min-h-screen flex flex-col">
    <Header class="bg-page sticky top-0 z-50 px-6 lg:px-20"/>

    <div class="mx-auto px-6 xl:px-20 pb-20">

      <div class="grid gap-8 py-6
                  grid-cols-1
                  xl:grid-cols-[14rem_minmax(0,1fr)_16rem]">

        <aside v-if="portfolio && blog"
               class="hidden xl:block sticky top-28 self-start">
          <ProjectList :portfolio="portfolio" :blog="blog"/>
        </aside>

        <main class="min-w-0">
          <slot/>
        </main>

        <aside v-if="toc"
               class="pl-4 hidden xl:block sticky top-28 self-start
                      max-h-[calc(100vh-7rem)] overflow-auto">
          <TableOfContents :toc="toc"/>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "#vue-router";
import {useAsyncData} from "#app";

const route = useRoute();
const {data: project} = await useAsyncData(
    () => `project-${route.path}`, // reactive key
    () => {
      const segments = route.path.split('/').filter(Boolean);
      const collection = segments[0] as "blog" | "portfolio";
      return queryCollection(collection).path(route.path).first();
    }
);
const toc = computed(() => project.value?.body?.toc);
const {data: portfolio} = await useAsyncData('portfolio', () => queryCollection('portfolio').order('order', 'ASC').all());
const {data: blog} = await useAsyncData('blog', () => queryCollection('blog').order('order', 'ASC').all());
</script>