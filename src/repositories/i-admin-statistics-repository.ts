export interface IUsersStreaksOutput {
  id: string
  email: string
  streak: number
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
  id: string
  email: string
  created_at: string
}

export interface IReadCountBySourceOutput {
  source: string
  count: number
}

export interface IReadCountByPostOutput {
  id: string
  count: number
}

export interface IAdminStatisticsRepository {
  getUsersStatus(): Promise<IUsersStatusOutput[]>
  getUsersStreaks(): Promise<IUsersStreaksOutput[]>
  getUsersReadingPeriods(): Promise<IUsersReadingPeriodsOutput[]>
  getUsers(): Promise<IUsersOutput[]>
  getReadCountBySource(): Promise<IReadCountBySourceOutput[]>
  getReadCountByPost(): Promise<IReadCountByPostOutput[]>
}
