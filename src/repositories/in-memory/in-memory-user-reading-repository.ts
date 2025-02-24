import {
  IUserLastReadingOutput,
  IUserReadingPeriodsOutput,
  IUserReadingsCreateInput,
  IUserReadingsOutput,
  IUserReadingsRepository,
} from '../i-user-readings-repository'

// Repositório InMemory para testes unitários
export class InMemoryUserReadingsRepository implements IUserReadingsRepository {
  private userReadings: IUserReadingsOutput[] = [
    {
      id: '1234', // ID fictício
      email: 'test9@example.com',
      created_at: new Date('2025-02-20').toISOString(),
      utm_campaign: 'none',
      utm_channel: 'none',
      utm_medium: 'none',
      utm_source: 'none',
      referring_site: 'none',
      status: 'none',
    },
  ]

  // Método para criar uma nova leitura
  async create(data: IUserReadingsCreateInput): Promise<void> {
    const newReading: IUserReadingsOutput = {
      id: data.id,
      email: data.email,
      status: data.status ?? 'none',
      utm_source: data.utm_source ?? 'none',
      utm_medium: data.utm_medium ?? 'none',
      utm_campaign: data.utm_campaign ?? 'none',
      utm_channel: data.utm_channel ?? 'none',
      referring_site: data.referring_site ?? '',
      created_at: data.created_at ?? new Date().toISOString(),
    }

    this.userReadings.push(newReading)
  }

  // Método para buscar todas as leituras de um usuário
  async findAllUserReadings(email: string) {
    const readings = this.userReadings.filter(
      (reading) => reading.email === email,
    )
    return readings
  }

  // Método para buscar a última leitura de um usuário
  async findUserLastReading(
    email: string,
  ): Promise<IUserLastReadingOutput | null> {
    const userReadings = this.userReadings.filter(
      (reading) => reading.email === email,
    )
    const lastReading = userReadings.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )[0]
    return lastReading
      ? {
          id: lastReading.id,
          email: lastReading.email,
          created_at: lastReading.created_at,
        }
      : null
  }

  // Método para buscar os períodos de leitura mais comuns de um usuário
  async findUserReadingPeriods(
    email: string,
  ): Promise<IUserReadingPeriodsOutput[]> {
    const userReadings = this.userReadings.filter(
      (reading) => reading.email === email,
    )
    const periods: { [key: string]: number } = {
      morning: 0,
      lunch: 0,
      afternoon: 0,
      night: 0,
    }

    userReadings.forEach((reading) => {
      const hour = new Date(reading.created_at).getHours()
      if (hour >= 6 && hour <= 11) periods.morning++
      else if (hour >= 12 && hour <= 14) periods.lunch++
      else if (hour >= 15 && hour <= 17) periods.afternoon++
      else periods.night++
    })

    return Object.keys(periods).map((period) => ({
      email,
      reading_period: period,
      count: periods[period],
    }))
  }
}
