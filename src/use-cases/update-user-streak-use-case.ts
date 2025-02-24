import {
  IUserReadingsInput,
  IUserReadingsRepository,
} from '@/repositories/i-user-readings-repository'
import { IUsersRepository } from '@/repositories/i-user-repository'
import { IUserStreakRepository } from '@/repositories/i-user-streak-repository'

export class UpdateUserStreakUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersStreakRepository: IUserStreakRepository,
    private usersReadingsRepository: IUserReadingsRepository,
  ) {
    this.usersRepository = usersRepository
    this.usersStreakRepository = usersStreakRepository
    this.usersReadingsRepository = usersReadingsRepository
  }

  async execute(data: IUserReadingsInput) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      await this.usersRepository.create(data.email)
    }

    const userLastReading =
      await this.usersReadingsRepository.findUserLastReading(data.email)

    const userLastReadingDate = userLastReading?.created_at
    const userCurrentReadingDate = data.created_at ?? new Date()

    if (userLastReadingDate) {
      const timeBetweenReadings =
        new Date(userCurrentReadingDate).getTime() -
        new Date(userLastReadingDate).getTime()

      const daysBetweenReadings = Math.round(
        timeBetweenReadings / (1000 * 60 * 60 * 24),
      )

      const userLastReadingWeekDay = new Date(userLastReadingDate).getDay()
      const userCurrentReadingWeekDay = new Date(
        userCurrentReadingDate,
      ).getDay()

      if (daysBetweenReadings === 1) {
        const userStreak = await this.usersStreakRepository.getUserStreak(
          data.email,
        )

        const userBestStreak = Number(userStreak.best_streak)
        const newStreak = Number(userStreak.streak) + 1

        await this.usersStreakRepository.update(data.email, newStreak)

        if (newStreak > userBestStreak) {
          await this.usersStreakRepository.updateBestStreak(
            data.email,
            newStreak,
          )
        }

        return
      }

      // getDay() returns an integer between 0 and 6, 0 is sunday and 6 saturday
      if (
        daysBetweenReadings === 2 &&
        userLastReadingWeekDay === 6 &&
        userCurrentReadingWeekDay === 1
      ) {
        const userStreak = await this.usersStreakRepository.getUserStreak(
          data.email,
        )

        const userBestStreak = Number(userStreak.best_streak)
        const newStreak = Number(userStreak.streak) + 1

        await this.usersStreakRepository.update(data.email, newStreak)

        if (newStreak > userBestStreak) {
          await this.usersStreakRepository.updateBestStreak(
            data.email,
            newStreak,
          )
        }

        return
      }

      if (daysBetweenReadings > 1) {
        await this.usersStreakRepository.update(data.email, 1)

        return
      }
    }

    if (!userLastReadingDate) {
      await this.usersStreakRepository.create(data.email)
    }
  }
}
