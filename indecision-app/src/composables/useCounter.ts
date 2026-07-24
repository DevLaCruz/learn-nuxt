import { ref, computed } from 'vue'

export const useCounter = (initialValue?: number) => {
  const counter = ref(initialValue ?? 5)

  return {
    counter,

    //Read only
    squareCounter: computed(() => counter.value * counter.value),
  }
}
