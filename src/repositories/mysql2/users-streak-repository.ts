import { getConnection } from '@/lib/db-connection'
import {
  IUserStreakOutput,
  IUserStreakRepository,
} from '../i-user-streak-repository'
import { v4 as uuidv4 } from 'uuid'

export class Mysql2UsersStreakRepository implements IUserStreakRepository {
  async getUserStreak(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, email, streak, best_streak FROM user_streaks WHERE email = ?',
      [email],
    )

    const streak = results as IUserStreakOutput[]

    return streak[0]
  }

  async update(email: string, user_streak: number) {
    const connection = await getConnection()

    await connection.execute(
      'UPDATE user_streaks SET streak = ? WHERE email = ?',
      [user_streak, email],
    )
  }

  async updateBestStreak(email: string, user_streak: number) {
    const connection = await getConnection()

    await connection.execute(
      'UPDATE user_streaks SET best_streak = ? WHERE email = ?',
      [user_streak, email],
    )
  }

  async create(email: string) {
    const connection = await getConnection()

    const id = uuidv4()

    await connection.execute(
      'INSERT INTO user_streaks (id, email, streak, best_streak) VALUES (?, ?, ?, ?)',
      [id, email, 1, 1],
    )
  }
}
