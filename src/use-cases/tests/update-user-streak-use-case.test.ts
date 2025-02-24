import { IUserReadingsInput } from '../../repositories/i-user-readings-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { InMemoryUsersStreakRepository } from '../../repositories/in-memory/in-memory-user-streak-repository'
import { InMemoryUserReadingsRepository } from '../../repositories/in-memory/in-memory-user-reading-repository'
import { UpdateUserStreakUseCase } from '../update-user-streak-use-case'

describe('UpdateUserStreakUseCase', () => {
  let usersRepository: InMemoryUsersRepository
  let usersStreakRepository: InMemoryUsersStreakRepository
  let usersReadingsRepository: InMemoryUserReadingsRepository
  let updateUserStreakUseCase: UpdateUserStreakUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    usersStreakRepository = new InMemoryUsersStreakRepository()
    usersReadingsRepository = new InMemoryUserReadingsRepository()
    updateUserStreakUseCase = new UpdateUserStreakUseCase(
      usersRepository,
      usersStreakRepository,
      usersReadingsRepository,
    )
  })

  it('should create a user and streak when the user does not exist', async () => {
    const userReadingData: IUserReadingsInput = {
      id: '233234351',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
    }

    await updateUserStreakUseCase.execute(userReadingData)

    const user = await usersRepository.findByEmail('test@example.com')

    expect(user).not.toBeNull()
    expect(user?.email).toBe('test@example.com')

    const userStreak =
      await usersStreakRepository.getUserStreak('test@example.com')

    expect(userStreak.streak).toBe('1')
    expect(userStreak.best_streak).toBe('1')
  })

  it('should update streak when a user reads on consecutive days', async () => {
    const userReadingData1: IUserReadingsInput = {
      id: '1234',
      email: 'test9@example.com',
      created_at: new Date('2025-02-21').toISOString(),
    }

    await updateUserStreakUseCase.execute(userReadingData1)

    const userStreak =
      await usersStreakRepository.getUserStreak('test9@example.com')

    expect(userStreak.streak).toBe('2')
  })

  it('should reset streak if the user skips a day', async () => {
    const userReadingData1: IUserReadingsInput = {
      id: '45454354',
      email: 'test@example.com',
      created_at: new Date('2025-02-23').toISOString(),
    }
    const userReadingData2: IUserReadingsInput = {
      id: '34243523',
      email: 'test@example.com',
      created_at: new Date('2025-02-25').toISOString(), // Skip a day
    }

    await updateUserStreakUseCase.execute(userReadingData1)

    await updateUserStreakUseCase.execute(userReadingData2)

    const userStreak =
      await usersStreakRepository.getUserStreak('test@example.com')
    expect(userStreak.streak).toBe('1')
  })

  it('should handle streak update after skipping the weekend', async () => {
    const userReadingData1: IUserReadingsInput = {
      id: '23233343',
      email: 'test@example.com',
      created_at: new Date('2025-02-20').toISOString(),
    }
    const userReadingData2: IUserReadingsInput = {
      id: '22323323',
      email: 'test@example.com',
      created_at: new Date('2025-02-23').toISOString(), // Skip the weekend
    }

    await updateUserStreakUseCase.execute(userReadingData1)

    await updateUserStreakUseCase.execute(userReadingData2)

    const userStreak =
      await usersStreakRepository.getUserStreak('test@example.com')
    expect(userStreak.streak).toBe('1')
  })
})
