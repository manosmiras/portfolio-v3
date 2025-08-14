<template>
  <header>
    <nav class="flex justify-between gap-x-4 py-6 items-center">
      <NuxtLink class="mr-auto font-semibold hover:text-primary" to="/">Manos Miras</NuxtLink>
      <NuxtLink class="link" to="/">Home</NuxtLink>
      <NuxtLink class="link" to="#portfolio">Portfolio</NuxtLink>
      <NuxtLink class="link" to="#blog">Blog</NuxtLink>
      <NuxtLink class="flex items-center hover:text-primary" to="https://www.github.com/manosmiras" target="_blank" rel="noopener">
        <Icon name="uil:github" size="1.5rem"/>
      </NuxtLink>
      <NuxtLink class="flex items-center hover:text-primary" to="https://www.linkedin.com/in/manosmiras" target="_blank" rel="noopener">
        <Icon name="uil:linkedin" size="1.5rem"/>
      </NuxtLink>
    </nav>
  </header>
</template>