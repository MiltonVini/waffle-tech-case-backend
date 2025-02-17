import { IUserReadingsRepository } from '@/repositories/i-user-readings-repository'
import { IUsersRepository } from '@/repositories/i-user-repository'
import { IUserStreakRepository } from '@/repositories/i-user-streak-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

export class GetUserStatisticsUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userReadingsRepository: IUserReadingsRepository,
    private usersStreakRepository: IUserStreakRepository,
  ) {
    this.userReadingsRepository = userReadingsRepository
    this.usersRepository = usersRepository
    this.usersStreakRepository = usersStreakRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const userStreak = await this.usersStreakRepository.getUserStreak(email)

    const userRegisterDate = user.created_at
    const currentDate = new Date()
    const userRegisterTime =
      currentDate.getTime() - new Date(userRegisterDate).getTime()
    const userRegisterDays = Math.round(
      userRegisterTime / (1000 * 60 * 60 * 24),
    )

    const allUserReadings =
      await this.userReadingsRepository.findAllUserReadings(email)

    const allUserReadingsCount = allUserReadings?.length

    const userReadingPeriods =
      await this.userReadingsRepository.findUserReadingPeriods(email)

    const userFavoriteReadingPeriod = userReadingPeriods.reduce(
      (max, current) => (current.count > max.count ? current : max),
    )

    return {
      userStreak,
      userRegisterDays,
      allUserReadingsCount,
      userFavoriteReadingPeriod,
    }
  }
}
