<template>
  <main v-if="page">
    <ContentRenderer :value="page"/>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first());
</script>