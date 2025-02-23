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
}

export interface IReadCountBySourceOutput {
  source: string
  count: number
}

export interface IReadCountByPostOutput {
  id: string
  count: number
}

export type StatisticsMapOutput =
  | IUsersStatusOutput[]
  | IUsersStreaksOutput[]
  | IUsersReadingPeriodsOutput[]
  | IUsersOutput[]
  | IReadCountBySourceOutput[]
  | IReadCountByPostOutput[]

export interface IAdminStatisticsRepository {
  getUsersStatus(): Promise<IUsersStatusOutput[]>
  getUsersStreaks(): Promise<IUsersStreaksOutput[]>
  getUsersReadingPeriods(): Promise<IUsersReadingPeriodsOutput[]>
  getNewUsersLast7DaysVersusPreviousWeek(): Promise<IUsersOutput[]>
  getReadCountBySource(): Promise<IReadCountBySourceOutput[]>
  getReadCountByPost(): Promise<IReadCountByPostOutput[]>
}
