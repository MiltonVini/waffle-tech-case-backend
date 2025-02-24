import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-user-repository' // Ajustado o caminho
import { InMemoryUserReadingsRepository } from '../../repositories/in-memory/in-memory-user-reading-repository' // Ajustado o caminho
import { InsertUserReadingUseCase } from '../insert-user-reading-use-case'

describe('InsertUserReadingUseCase', () => {
  let insertUserReadingUseCase: InsertUserReadingUseCase
  let usersRepository: InMemoryUsersRepository
  let userReadingsRepository: InMemoryUserReadingsRepository

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    userReadingsRepository = new InMemoryUserReadingsRepository()
    insertUserReadingUseCase = new InsertUserReadingUseCase(
      usersRepository,
      userReadingsRepository,
    )
  })

  it('should create a user and insert reading data when user does not exist', async () => {
    const userReadingData = {
      email: 'test@example.com',
      id: '123',
      status: 'completed',
      created_at: '2025-02-24T10:00:00Z',
    }

    await insertUserReadingUseCase.execute(userReadingData)

    const user = await usersRepository.findByEmail('test@example.com')
    expect(user).not.toBeNull()

    const userReadings =
      await userReadingsRepository.findAllUserReadings('test@example.com')

    expect(userReadings).toHaveLength(1)
    expect(userReadings[0].email).toBe('test@example.com')
  })

  it('should not create a user if it already exists', async () => {
    const userReadingData = {
      email: 'test@example.com',
      id: '123',
      status: 'completed',
      created_at: '2025-02-24T10:00:00Z',
    }

    await usersRepository.create('test@example.com')
    await insertUserReadingUseCase.execute(userReadingData)

    const user = await usersRepository.findByEmail('test@example.com')
    expect(user).not.toBeNull()

    const userReadings =
      await userReadingsRepository.findAllUserReadings('test@example.com')
    expect(userReadings).toHaveLength(1)
    expect(userReadings[0].email).toBe('test@example.com')
  })
})
