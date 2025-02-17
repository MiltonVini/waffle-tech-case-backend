import { IAdminStatisticsRepository } from '@/repositories/i-admin-statistics-repository'

export class GetAdminStatisticsUseCase {
  constructor(private adminStatisticsRepository: IAdminStatisticsRepository) {
    this.adminStatisticsRepository = adminStatisticsRepository
  }

  async execute() {
    const usersStreaks = await this.adminStatisticsRepository.getUsersStreaks()
    const usersReadingPeriods =
      await this.adminStatisticsRepository.getUsersReadingPeriods()
    const users = await this.adminStatisticsRepository.getUsers()
    const readCountByPost =
      await this.adminStatisticsRepository.getReadCountByPost()
    const readCountBySource =
      await this.adminStatisticsRepository.getReadCountByPost()

    return {
      usersStreaks,
      users,
      usersReadingPeriods,
      readCountByPost,
      readCountBySource,
    }
  }
}
