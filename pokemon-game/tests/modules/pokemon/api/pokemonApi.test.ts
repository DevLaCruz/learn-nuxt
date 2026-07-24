import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'

describe('pokemonApi', () => {
  test('should be configured as expected', () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon'
    expect(baseURL).toBe(pokemonApi.defaults.baseURL)
  })
})
