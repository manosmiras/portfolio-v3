<script setup lang="ts">
import Portfolio from "~/components/Portfolio.vue";
import Hero from "~/components/Hero.vue";
</script>

<template>
  <Hero></Hero>
  <div class="flex flex-col">
    <Portfolio id="portfolio"></Portfolio>
    <Blog id="blog"></Blog>
  </div>
</template>