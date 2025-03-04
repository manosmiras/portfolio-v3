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
    @apply hover:cursor-pointer hover:brightness-75 transition-all rounded-md font-semibold px-10 py-2;
  }

  .primary {
    @apply bg-primary text-pageAlt;
  }

  .secondary {
    @apply bg-secondary;
  }
</style>