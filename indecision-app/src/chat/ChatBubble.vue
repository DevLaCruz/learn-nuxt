<script setup lang="ts">

interface Props {
  message: string
  itsMine: boolean
  image?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-end" v-if="itsMine">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">{{message}}</div>
  </div>

  <!-- Example Received Message -->
  <div class="flex" v-else>
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span class="capitalize">{{message}}</span>
      <img v-if="image" :src="image" alt="YesNoImage" class="w-52 h-52 object-cover rounded-md"/>

    </div>
  </div>
</template>

<style scoped>

</style>
