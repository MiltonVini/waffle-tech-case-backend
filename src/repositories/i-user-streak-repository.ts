export interface IUserStreakOutput {
  id: string
  email: string
  streak: string
}

export interface IUserStreakRepository {
  getUserStreak(email: string): Promise<IUserStreakOutput>
  update(email: string, user_streak: number): Promise<void>
  create(email: string): Promise<void>
}
