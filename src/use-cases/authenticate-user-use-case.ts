import { IUsersRepository } from '@/repositories/i-user-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}
