import {
  IAdminStatisticsRepository,
  StatisticsMapOutput,
} from '@/repositories/i-admin-statistics-repository'
import { InvalidStstisticError } from './errors/invalid-statistic-error'

export class GetAdminStatisticsUseCase {
  constructor(private adminStatisticsRepository: IAdminStatisticsRepository) {
    this.adminStatisticsRepository = adminStatisticsRepository
  }

  async execute(statistic: string) {
    const statisticsMap: Record<string, () => Promise<StatisticsMapOutput>> = {
      users_streaks: () => this.adminStatisticsRepository.getUsersStreaks(),
      users_reading_periods: () =>
        this.adminStatisticsRepository.getUsersReadingPeriods(),
      new_users: () =>
        this.adminStatisticsRepository.getNewUsersLast7DaysVersusPreviousWeek(),
      read_count_by_post: () =>
        this.adminStatisticsRepository.getReadCountByPost(),
      read_count_by_source: () =>
        this.adminStatisticsRepository.getReadCountBySource(),
    }

    if (statisticsMap[statistic]) {
      return await statisticsMap[statistic]()
    }

    throw new InvalidStstisticError()
  }
}
