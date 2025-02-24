export interface IUsersStreaksOutput {
  id: string
  email: string
  streak: number
  best_streak: number
}

export interface IUsersReadingPeriodsOutput {
  email: string
  reading_period: string
  count: number
}

export interface IUsersStatusOutput {
  id: string
  email: string
  status: string
  created_at: string
}

export interface IUsersOutput {
  last_7_days_new_users_count: number
  previous_week_new_users_count: number
  growth_percentage: number
}

export interface IReadCountBySourceOutput {
  source: string
  count: number
}

export interface IReadCountByPostOutput {
  id: string
  count: number
}

export interface IUsersCountByStreakOutput {
  streak: string
  current_streak_count: number
}

export interface IUsersReadCountByReadingPeriod {
  reading_period: string
  count: number
}

export type StatisticsMapOutput =
  | IUsersStatusOutput[]
  | IUsersStreaksOutput[]
  | IUsersReadingPeriodsOutput[]
  | IUsersOutput
  | IReadCountBySourceOutput[]
  | IReadCountByPostOutput[]
  | IUsersCountByStreakOutput[]
  | IUsersReadCountByReadingPeriod[]

export interface IAdminStatisticsRepository {
  getUsersStatus(): Promise<IUsersStatusOutput[]>
  getUsersStreaks(): Promise<IUsersStreaksOutput[]>
  getUserCountByStreaks(): Promise<IUsersCountByStreakOutput[]>
  getUsersReadingPeriods(): Promise<IUsersReadingPeriodsOutput[]>
  getUsersCountByReadingPeriod(): Promise<IUsersReadCountByReadingPeriod[]>
  getNewUsersLast7DaysVersusPreviousWeek(): Promise<IUsersOutput>
  getReadCountBySource(): Promise<IReadCountBySourceOutput[]>
  getReadCountByPost(): Promise<IReadCountByPostOutput[]>
}
