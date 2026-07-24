import { describe, test, expect } from 'vitest'
import { useCounter } from '@/composables/useCounter.ts'

describe('useCounter', () => {
  test('Initializes counter with default values', () => {
    const { counter, squareCounter } = useCounter()

    expect(counter.value).toBe(5)
    expect(squareCounter.value).toBe(25)
  })

  test('Initializes counter with provided initial value', () => {
    const initialValue = 10
    const { counter, squareCounter } = useCounter(initialValue)

    expect(counter.value).toBe(initialValue)
    expect(squareCounter.value).toBe(initialValue * initialValue)
  })

  test('increments counter correctly', () => {
    const { counter, squareCounter } = useCounter()

    counter.value++

    expect(counter.value).toBe(6)
    expect(squareCounter.value).toBe(36)
  })
})
