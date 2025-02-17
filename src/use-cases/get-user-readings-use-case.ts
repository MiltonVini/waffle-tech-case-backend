import { IUserReadingsRepository } from '@/repositories/i-user-readings-repository'
import { IUsersRepository } from '@/repositories/i-user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

export class GetUserReadingsUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersReadingsRepository: IUserReadingsRepository,
  ) {
    this.usersRepository = usersRepository
    this.usersReadingsRepository = usersReadingsRepository
  }

  async execute(email: string) {
    const user = this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const userReadings =
      await this.usersReadingsRepository.findAllUserReadings(email)

    return userReadings
  }
}
