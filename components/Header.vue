<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="flex gap-x-4">
      <NuxtLink class="mr-auto font-semibold" to="/">Manos Miras</NuxtLink>
      <NuxtLink class="link link-hover" to="/">Home</NuxtLink>
      <NuxtLink class="link link-hover" to="/about">About</NuxtLink>
      <NuxtLink class="link link-hover" to="/portfolio">Portfolio</NuxtLink>
      <NuxtLink class="link link-hover" to="/blog">Blog</NuxtLink>
      <NuxtLink class="link link-hover" to="/contact">Contact</NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="css">
.link {
  @apply text-sm transition-all border-b-2 border-b-transparent;
}
.link-hover {
  @apply hover:text-primary
}
.link-active {
  @apply border-b-primary text-primary;
}
</style>