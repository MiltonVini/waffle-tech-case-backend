import { IUserReadingsInput } from '@/repositories/i-user-readings-repository'
import { InsertUserReadingUseCase } from './insert-user-reading-use-case'
import { UpdateUserStreakUseCase } from './update-user-streak-use-case'

export class InsertUserReadingAndUpdateUserStreakUseCase {
  constructor(
    private insertUserReadingUseCase: InsertUserReadingUseCase,
    private updateUserStreakUseCase: UpdateUserStreakUseCase,
  ) {
    this.insertUserReadingUseCase = insertUserReadingUseCase
    this.updateUserStreakUseCase = updateUserStreakUseCase
  }

  async execute(data: IUserReadingsInput) {
    await this.updateUserStreakUseCase.execute(data)

    await this.insertUserReadingUseCase.execute(data)
  }
}
