<script setup lang="ts">
const { data } = await useAsyncData('home', () => queryContent('/portfolio').find());
console.log(data);

</script>

<template>
  <table class="table-auto">
    <tbody>
      <tr class="text-left" v-for="project in data">
        <td>
          <img class="w-72" :src="project.previewImg" :alt="project.title">
        </td>
        <td>{{project.title}}</td>
        <td>{{project.description}}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>