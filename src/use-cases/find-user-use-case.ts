import { IUsersRepository } from '@/repositories/i-user-repository'

export class FindUserByEmailUseCase {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    return user
  }
}
