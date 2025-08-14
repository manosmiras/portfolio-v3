<template>
  <div class="flex flex-row flex-wrap gap-2 justify-end">
    <Tag v-for="tag in modelValue">
      {{ tag }}
    </Tag>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  modelValue: string[],
}>();

</script>