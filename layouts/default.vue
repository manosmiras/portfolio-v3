<script setup lang="ts">

</script>

<template>
<div>
  <div class="flex flex-col min-h-screen lg:px-52 md:px-32 sm:px-6 h-100">
    <Header class="sticky top-0 z-50 bg-page" />
    <div class="py-10 flex flex-col flex-grow">
      <slot/>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>