import { IBadgesRepository } from '@/repositories/i-bagdes-repository'
import { IUsersRepository } from '@/repositories/i-user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

export class GetUserBadgesUseCase {
  constructor(
    private badgesRepository: IBadgesRepository,
    private usersRepository: IUsersRepository,
  ) {
    this.badgesRepository = badgesRepository
    this.usersRepository = usersRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const badges = await this.badgesRepository.getUserBagdes(email)

    return badges
  }
}
