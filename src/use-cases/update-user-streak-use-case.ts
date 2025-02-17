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

    console.log(userCurrentReadingDate)
    console.log(userLastReadingDate)

    if (userLastReadingDate) {
      const timeBetweenReadings =
        new Date(userCurrentReadingDate).getTime() -
        new Date(userLastReadingDate).getTime()

      const daysBetweenReadings = Math.round(
        timeBetweenReadings / (1000 * 60 * 60 * 24),
      )

      console.log(new Date(userLastReadingDate).getDay())

      const userLastReadingWeekDay = new Date(userLastReadingDate).getDay()
      const userCurrentReadingWeekDay = new Date(
        userCurrentReadingDate,
      ).getDay()

      // console.log(daysBetweenReadings)

      if (daysBetweenReadings === 1) {
        console.log('Aumentando o streak')
        const currentStreak = await this.usersStreakRepository.getUserStreak(
          data.email,
        )

        const newStreak = Number(currentStreak.streak) + 1

        await this.usersStreakRepository.update(data.email, newStreak)

        return
      }

      // getDay() returns an integer between 0 and 6, 0 is sunday and 6 saturday
      if (
        daysBetweenReadings === 2 &&
        userLastReadingWeekDay === 6 &&
        userCurrentReadingWeekDay === 1
      ) {
        console.log('Aumentando o streak, pulando o domingo')
        const currentStreak = await this.usersStreakRepository.getUserStreak(
          data.email,
        )

        const newStreak = Number(currentStreak.streak) + 1

        await this.usersStreakRepository.update(data.email, newStreak)

        return
      }

      if (daysBetweenReadings > 1) {
        console.log('Volta o streak para um')
        await this.usersStreakRepository.update(data.email, 1)

        return
      }
    }

    if (!userLastReadingDate) {
      console.log('Criando o primeiro streak')
      await this.usersStreakRepository.create(data.email)
    }
  }
}
