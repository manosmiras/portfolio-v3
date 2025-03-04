<template>
  <div class="static">
    <video autoplay muted loop class="object-cover w-screen h-screen blur-xs brightness-90 blur-sm">
      <source src="@/assets/videos/Moirai.mp4" type="video/mp4">
    </video>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default text-center">
      <div class="text-7xl font-bold">Manos Miras</div>
      <div class="text-3xl font-semibold">Software Engineer & Game Developer</div>
      <div class="flex justify-self-center gap-6 p-4">
        <Button to="#portfolio">Portfolio</Button>
        <Button to="#blog" variant="secondary">Blog</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
