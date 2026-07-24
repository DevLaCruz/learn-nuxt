import { GameStatus } from '@/modules/pokemon/interfaces'

describe('GameStatus enum', () => {
  test('should have a value of "playing" ', () => {
    expect(GameStatus.Playing).toBe('playing')
  })
})
