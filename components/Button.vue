<script setup lang="ts">
   withDefaults(defineProps<{
     variant?: 'primary' | 'secondary',
     to: string
   }>(), {
     variant: 'primary'
   });
</script>

<template>
  <RouterLink :to="to" :class="variant" class="button">
      <slot></slot>
  </RouterLink>
</template>

<style scoped>
  .button {
    @apply hover:cursor-pointer rounded-full font-semibold px-6 py-2
  }

  .primary {
    @apply bg-primary text-secondary;
  }

  .secondary {
    @apply bg-secondary;
  }
</style>