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

<script setup lang="ts">
import {useAsyncData} from "#app";

const { data: portfolio } = await useAsyncData('portfolio', () => queryCollection('portfolio').all());
const { data: blog } = await useAsyncData('blog', () => queryCollection('blog').all());
</script>