<script setup lang="ts">
import {useRoute} from "#vue-router";
import {useAsyncData} from "#app";
import type {Project} from "~/types/project";

const route = useRoute();
const { data: portfolio } = await useAsyncData('portfolio', () => queryContent<Project[]>('/portfolio').find());
const { data: blog } = await useAsyncData('blog', () => queryContent<Project[]>('/blog').find());
</script>

<template>
  <div class="grid grid-cols-5 gap-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="relative">
      <Sidebar class="sticky py-6 top-0 col-span-1" :portfolio="portfolio" :blog="blog"/>
    </div>
    <div class="col-span-4 py-6">
      <slot></slot>
    </div>

  </div>
</template>

<style scoped>

</style>