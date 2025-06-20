<template>
  <ul>
    <li :class="`toc-link-depth-${link.depth}`" v-for="link in links" :key="link.text">
      <a class="link text-gray-300" :href="`#${link.id}`">
        {{ link.text }}
      </a>
      <TableOfContentsLinks v-if="link.children" :links="link.children"></TableOfContentsLinks>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {TocLink} from "@nuxt/content";

defineProps<{
  links: TocLink[];
}>();
</script>

<style scoped>
.toc-link-depth-2 {
  padding-left: 0;
}

.toc-link-depth-3 {
  padding-left: 10px;
}

.toc-link-depth-4 {
  padding-left: 20px;
}

.toc-link-depth-5 {
  padding-left: 30px;
}

</style>