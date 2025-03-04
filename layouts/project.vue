<script setup lang="ts">
import {useRoute} from "#vue-router";
import {useAsyncData} from "#app";
import type {Project} from "~/types/project";

const route = useRoute();
const { data: project } = await useAsyncData('project', () => queryContent<Project>(route.path).findOne());
const { data: portfolio } = await useAsyncData('portfolio', () => queryContent<Project[]>('/portfolio').find());
const { data: blog } = await useAsyncData('blog', () => queryContent<Project[]>('/blog').find());
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen lg:px-52 md:px-32 sm:px-6 h-100">
      <Header class="sticky top-0 z-50 bg-page" />
      <div>
        <ProjectList :portfolio="portfolio" :blog="blog" class="fixed top-28 left-52 z-50 w-48"/>
        <div class="mx-60 py-2">
          <slot/>
        </div>
        <TableOfContents class="fixed top-28 right-52 z-50" :toc="project.body.toc"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>