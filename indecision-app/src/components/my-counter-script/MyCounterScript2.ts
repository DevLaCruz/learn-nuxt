import { ref, computed, defineComponent } from 'vue'
import { useCounter } from '../../composables/useCounter.ts'

export default defineComponent({
  props: {
    value: { type: Number, required: true },
  },

  setup(props) {
    //const props = defineProps<Props>()

    const { counter, squareCounter } = useCounter(props.value ?? 12)

    // const counter = ref(props.value ?? 7)
    // const squareCounter = computed(() => counter.value * counter.value)

    return {
      counter,
      squareCounter,
    }
  },
})

// const addQuantity = () => {
//   counter.value++
// }

// const decQuantity = () => {
//   counter.value--
// }

console.log('Hello Apps')
