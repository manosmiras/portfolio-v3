<template>
  <header>
    <nav class="flex items-center justify-between py-6">

      <NuxtLink class="mr-auto font-semibold hover:text-primary" to="/">
        Manos Miras
      </NuxtLink>

      <div class="hidden md:flex items-center gap-x-4">
        <NuxtLink class="link" to="/">Home</NuxtLink>
        <NuxtLink class="link" to="#portfolio">Portfolio</NuxtLink>
        <NuxtLink class="link" to="#blog">Blog</NuxtLink>
        <NuxtLink class="flex items-center hover:text-primary" to="https://www.github.com/manosmiras" target="_blank"
                  rel="noopener">
          <Icon name="uil:github" size="1.5rem"/>
        </NuxtLink>
        <NuxtLink class="flex items-center hover:text-primary" to="https://www.linkedin.com/in/manosmiras"
                  target="_blank" rel="noopener">
          <Icon name="uil:linkedin" size="1.5rem"/>
        </NuxtLink>
      </div>

      <button
          class="md:hidden flex hover:text-primary"
          @click="isOpen = !isOpen"
          :aria-expanded="isOpen ? 'true' : 'false'"
          aria-controls="mobile-nav"
      >
        <Icon v-if="!isOpen" name="uil:bars" size="1.5rem"/>
        <Icon v-else name="uil:times" size="1.5rem"/>
      </button>
    </nav>

    <div
        id="mobile-nav"
        class="md:hidden overflow-hidden transition-[max-height] duration-200"
        :style="{ maxHeight: isOpen ? '16rem' : '0' }"
    >
      <div class="flex flex-col gap-3 bg-page py-4">
        <NuxtLink class="link" to="/" @click="isOpen=false">Home</NuxtLink>
        <NuxtLink class="link" to="#portfolio" @click="isOpen=false">Portfolio</NuxtLink>
        <NuxtLink class="link" to="#blog" @click="isOpen=false">Blog</NuxtLink>
        <div class="flex gap-4 pt-1">
          <NuxtLink class="flex items-center center hover:text-primary" to="https://www.github.com/manosmiras"
                    target="_blank" rel="noopener" @click="isOpen=false">
            <Icon name="uil:github" size="1.5rem"/>
          </NuxtLink>
          <NuxtLink class="flex items-center hover:text-primary" to="https://www.linkedin.com/in/manosmiras"
                    target="_blank" rel="noopener" @click="isOpen=false">
            <Icon name="uil:linkedin" size="1.5rem"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'

const isOpen = ref(false)
const route = useRoute()

// Close menu on route change
watch(() => route.fullPath, () => (isOpen.value = false))
</script>
