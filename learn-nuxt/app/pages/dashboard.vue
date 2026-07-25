<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  middleware:'auth' // para mas de 1 middleware poner entre llaves
});
</script>

<template>
  <div>
    <!-- <h3>Hola Mundo - dashboard Page</h3> -->
    <NuxtPage />
  </div>
</template>
