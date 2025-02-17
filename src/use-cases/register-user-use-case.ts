import { IUsersRepository } from '@/repositories/i-user-repository'

export class RegisterUserUseCase {
  constructor(private userRepository: IUsersRepository) {
    this.userRepository = userRepository
  }

  async execute(email: string) {
    await this.userRepository.create(email)
  }
}
