<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="flex gap-x-4 py-6">
      <NuxtLink class="mr-auto font-semibold" to="/">Manos Miras</NuxtLink>
      <NuxtLink class="link" to="/">Home</NuxtLink>
      <NuxtLink class="link" to="/about">About</NuxtLink>
      <NuxtLink class="link" to="/portfolio">Portfolio</NuxtLink>
      <NuxtLink class="link" to="/blog">Blog</NuxtLink>
      <NuxtLink class="link" to="/contact">Contact</NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="css">
.link-active {
  @apply border-b-primary text-primary;
}
</style>