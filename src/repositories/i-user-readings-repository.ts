export interface IUserReadingsInput {
  id: string
  email: string
  status?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_channel?: string
  referring_site?: string
  created_at?: string
}

export interface IUserReadingsCreateInput {
  id: string
  email: string
  status?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_channel?: string
  referring_site?: string
  created_at?: string
}

export interface IUserReadingsOutput {
  id: string
  email: string
  status: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_channel: string
  referring_site: string
  created_at: string
}

export interface IUserLastReadingOutput {
  id: string
  email: string
  created_at: string
}

export interface IUserReadingPeriodsOutput {
  email: string
  reading_period: string
  count: number
}

export interface IUserReadingsRepository {
  create(data: IUserReadingsCreateInput): Promise<void>
  findAllUserReadings(email: string): Promise<IUserReadingsOutput[] | null>
  findUserLastReading(email: string): Promise<IUserLastReadingOutput | null>
  findUserReadingPeriods(email: string): Promise<IUserReadingPeriodsOutput[]>
}
