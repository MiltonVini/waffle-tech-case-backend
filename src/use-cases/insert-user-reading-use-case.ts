import {
  IUserReadingsInput,
  IUserReadingsRepository,
} from '@/repositories/i-user-readings-repository'
import { IUsersRepository } from '@/repositories/i-user-repository'

export class InsertUserReadingUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersReadingsRepository: IUserReadingsRepository,
  ) {
    this.usersRepository = usersRepository
    this.usersReadingsRepository = usersReadingsRepository
  }

  async execute(data: IUserReadingsInput) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      await this.usersRepository.create(data.email)
    }

    await this.usersReadingsRepository.create(data)
  }
}
