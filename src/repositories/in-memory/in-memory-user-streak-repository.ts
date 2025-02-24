import { UserNotFoundError } from '../../use-cases/errors/user-not-found-error'
import {
  IUserStreakOutput,
  IUserStreakRepository,
} from '../i-user-streak-repository'

export class InMemoryUsersStreakRepository implements IUserStreakRepository {
  private userStreaks: IUserStreakOutput[] = [
    {
      id: '233121',
      email: 'test9@example.com',
      streak: '1',
      best_streak: '1',
    },
  ]

  async getUserStreak(email: string) {
    const userStreak = this.userStreaks.find((streak) => streak.email === email)

    console.log(userStreak)

    if (!userStreak) {
      throw new UserNotFoundError()
    }

    return userStreak
  }

  async update(email: string, user_streak: number) {
    const userStreak = this.userStreaks.find((streak) => streak.email === email)

    if (userStreak) {
      userStreak.streak = user_streak.toString()
    }
  }

  async updateBestStreak(email: string, user_streak: number) {
    const userStreak = this.userStreaks.find((streak) => streak.email === email)

    if (userStreak) {
      userStreak.best_streak = user_streak.toString()
    }
  }

  async create(email: string) {
    const newUserStreak: IUserStreakOutput = {
      id: String(this.userStreaks.length + 1),
      email,
      streak: '1',
      best_streak: '1',
    }

    this.userStreaks.push(newUserStreak)
  }
}
