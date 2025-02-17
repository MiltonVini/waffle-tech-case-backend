import { getConnection } from '@/lib/db-connection'
import {
  IUserLastReadingOutput,
  IUserReadingPeriodsOutput,
  IUserReadingsCreateInput,
  IUserReadingsOutput,
  IUserReadingsRepository,
} from '../i-user-readings-repository'

export class Mysql2UserReadingsRepository implements IUserReadingsRepository {
  async create(data: IUserReadingsCreateInput) {
    const connection = await getConnection()

    await connection.execute(
      'INSERT INTO user_readings (id, email, status, referring_site, utm_source, utm_medium, utm_campaign, utm_channel, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.id,
        data.email,
        data.status ?? 'none',
        data.referring_site ?? null,
        data.utm_source ?? 'none',
        data.utm_medium ?? 'none',
        data.utm_campaign ?? 'none',
        data.utm_channel ?? 'none',
        data.created_at ? new Date(data.created_at) : new Date(), // colocar timeZone Br
      ],
    )
  }

  async findAllUserReadings(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, email, status, referring_site, utm_source, utm_medium, utm_campaign, utm_channel, created_at from user_readings WHERE email = ?',
      [email],
    )

    const userReadings = results as IUserReadingsOutput[]

    return userReadings
  }

  async findUserLastReading(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, email, created_at FROM user_readings WHERE email = ? AND created_at = (SELECT MAX(created_at) from user_readings WHERE email = ?)',
      [email, email],
    )

    const userLastReading = results as IUserLastReadingOutput[]

    return userLastReading.length > 0 ? userLastReading[0] : null
  }

  async findUserReadingPeriods(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT email, 
        CASE 
          WHEN HOUR(created_at) BETWEEN 6 AND 11 THEN 'morning' 
          WHEN HOUR(created_at) BETWEEN 12 AND 14 THEN 'lunch' 
          WHEN HOUR(created_at) BETWEEN 15 AND 17 THEN 'afternoon' 
          ELSE 'nigth' END AS reading_period, 
          COUNT(id) AS count 
          FROM user_readings 
          WHERE email = ? GROUP BY email, reading_period`,
      [email],
    )

    const userMostCommonReadingPeriod = results as IUserReadingPeriodsOutput[]

    return userMostCommonReadingPeriod
  }
}
