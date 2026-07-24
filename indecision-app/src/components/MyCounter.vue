<template>
  <section>
    <h3>Counter {{ counter }}</h3>
    <h3 data-testid="square-label">Square: {{ squareCounter }}</h3>
    <!-- <h4>{{ text }}</h4> -->

    <div class="">
      <button @click="counter++">+1</button>
      <button @click="counter--" data-testid="decrement-label">-1</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCounter } from '../composables/useCounter.ts'
interface Props {
  value: number
}

const props = defineProps<Props>()

const { counter, squareCounter } = useCounter(props.value)

// import { ref, computed } from 'vue'

// interface Props {
//   value: number
//   text: string
// }

// // const props = defineProps({
// //   value: { type: Number, required: true },
// // })
// const props = defineProps<Props>()

// const counter = ref(props.value ?? 5)
// const squareCounter = computed(() => counter.value * counter.value)

// const addQuantity = () => {
//   counter.value++
// }

// const decQuantity = () => {
//   counter.value--
// }

// console.log('Hello Apps')
</script>
