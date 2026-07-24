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

<script setup lang="ts">
import { useCounter } from '../composables/useCounter.ts'
interface Props {
  value: number
}

const props = defineProps<Props>()

const { counter, squareCounter } = useCounter(13)

// import { ref, computed, defineComponent } from 'vue'

// export default defineComponent({
//   props: {
//     value: { type: Number, required: true },
//   },

//   setup(props) {
//     //const props = defineProps<Props>()

//     const counter = ref(props.value ?? 10)
//     const squareCounter = computed(() => counter.value * counter.value)

//     return {
//       counter,
//       squareCounter,
//     }
//   },
// })

// const addQuantity = () => {
//   counter.value++
// }

// const decQuantity = () => {
//   counter.value--
// }

console.log('Hello Apps')
</script>
