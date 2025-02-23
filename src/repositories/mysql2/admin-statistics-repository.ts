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
      `SELECT id, email, streak, best_streak FROM user_streaks ORDER BY streak DESC LIMIT 100`,
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
          GROUP BY email, reading_period
          LIMIT 100`,
    )

    return results as IUsersReadingPeriodsOutput[]
  }

  async getNewUsersLast7DaysVersusPreviousWeek() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT COUNT(
          CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END
        ) AS last_7_days_new_users_count,
          COUNT(
          CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END
        ) AS previous_week_new_users_count
        FROM users`,
    )

    return results as IUsersOutput[]
  }

  async getReadCountBySource() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT utm_source, COUNT(id) as read_count FROM user_readings GROUP BY utm_source`,
    )

    return results as IReadCountBySourceOutput[]
  }

  async getReadCountByPost() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT id, COUNT(id) as read_count FROM user_readings GROUP BY id`,
    )

    return results as IReadCountByPostOutput[]
  }
}
