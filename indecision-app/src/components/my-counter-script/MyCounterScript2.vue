<template>
  <section>
    <h3>Counter {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
    <!-- <h4>{{ text }}</h4> -->

    <div class="">
      <button @click="counter++">+1</button>
      <button @click="counter--">-1</button>
    </div>
  </section>
</template>

<script lang="ts" src="./MyCounterScript2.ts"></script>
