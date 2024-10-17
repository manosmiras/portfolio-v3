<script setup lang="ts">
import Tag from "~/components/Tag.vue";

defineProps({
  tags: Array as Array<string>,
});

</script>

<template>
  <Tag v-for="tag in tags">
    {{ tag }}
  </Tag>
</template>