<template>
  <div>
    <div class="flex flex-col min-h-screen h-100">
      <Header :class="scrolledPastHero ? 'bg-header' : 'bg-transparent'" class="transition-colors duration-500 transition-discrete fixed w-screen top-0 z-50 px-20"/>
      <div class="flex flex-col flex-grow">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const scrolledPastHero = ref(false);

const trackScroll = () => {
  scrolledPastHero.value = window.scrollY > window.innerHeight;
};

onMounted(() => {
  window.addEventListener('scroll', trackScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', trackScroll);
});


</script>