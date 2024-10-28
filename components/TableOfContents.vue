<script setup lang="ts">

import type {Toc} from "@nuxt/content";
defineProps<{
  toc: Toc;
}>();

</script>

<template>
  <div>
    <div class="font-semibold text-sm">On this page</div>
    <TableOfContentsLinks :links="toc.links"></TableOfContentsLinks>
  </div>
</template>

<style scoped>

</style>