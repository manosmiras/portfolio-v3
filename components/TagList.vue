<template>
  <Tag v-for="tag in tags">
    {{ tag }}
  </Tag>
</template>

<script setup lang="ts">
import Tag from "~/components/Tag.vue";

defineProps<{
  tags: string[],
}>();

</script>