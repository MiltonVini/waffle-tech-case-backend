import { getConnection } from '@/lib/db-connection'
import {
  IAdminStatisticsRepository,
  IReadCountByPostOutput,
  IReadCountBySourceOutput,
  IUsersOutput,
  IUsersReadingPeriodsOutput,
  IUsersStatusOutput,
  IUsersStreaksOutput,
} from '../i-admin-statistics-repository'

export class Mysql2AdminStatisticsRepository
  implements IAdminStatisticsRepository
{
  async getUsersStatus() {
    const connection = await getConnection()

    const [results] = await connection.execute(``)

    return results as IUsersStatusOutput[]
  }

  async getUsersStreaks() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT id, email, streak FROM user_streaks ORDER BY streak DESC`,
    )

    const usersStreaks = results as IUsersStreaksOutput[]

    return usersStreaks
  }

  async getUsersReadingPeriods() {
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
          GROUP BY email, reading_period`,
    )

    return results as IUsersReadingPeriodsOutput[]
  }

  async getUsers() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT id, email, created_at FROM users`,
    )

    return results as IUsersOutput[]
  }

  async getReadCountBySource() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT utm_source, COUNT(id) FROM user_readings GROUP BY utm_source`,
    )

    return results as IReadCountBySourceOutput[]
  }

  async getReadCountByPost() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT id, COUNT(id) FROM user_readings GROUP BY id`,
    )

    return results as IReadCountByPostOutput[]
  }
}
