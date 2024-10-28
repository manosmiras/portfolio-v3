<script setup lang="ts">
import {useRoute} from "#vue-router";

const route = useRoute();
const { data } = await useAsyncData('project', () => queryContent(route.path).findOne());
console.log(data.value?.body.toc);
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen lg:px-52 md:px-32 sm:px-6 h-100">
      <Header class="sticky top-0 z-50 bg-page" />
      <div>
        <div class="fixed top-28 left-52 z-50">left</div>
        <div class="mx-60 py-2">
          <slot/>
        </div>
        <TableOfContents class="fixed top-28 right-52 z-50" :toc="data.body.toc">right</TableOfContents>
<!--        <TableOfContents class="col-span-1 sidebar" :links="data.body.toc.links">right</TableOfContents>-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>