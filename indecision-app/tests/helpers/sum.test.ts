import { expect, test } from 'vitest'
import { sum, addArray } from '../../src/helpers/sum'

test('aads 1+2 to equal 3', () => {
  // Preparación
  const a = 1
  const b = 2

  // Estimulo
  const result = sum(a, b)

  // El comportamiento esperado
  expect(result).toBe(3)
  // if (sum(1, 2) !== 3) {
  //   throw new Error('The adition is not correct')
  // }
})

test('the result is not < of the one number', () => {
  //prepare
  const a = [1, 4, 5]

  // estimule
  const result = addArray(a)
  // El comportamiento esperado

  expect(result).toBe(10)
})

test('the result is not < of the one number', () => {
  //prepare
  const a = [4, 2, 6]

  // estimule
  const result = addArray(a)

  // El comportamiento esperado
  expect(result / 2).toBe(a.at(-1))
})

test('the result is not < of the one number', () => {
  //prepare
  const a = [1, 3, 2, 6]

  // estimule
  const result = addArray(a)

  // El comportamiento esperado
  expect(a.at(-1)).toBeLessThan(result)
})

test('should return 0 if the array is empty', () => {})
