import { getConnection } from '@/lib/db-connection'
import {
  IAdminStatisticsRepository,
  IReadCountByPostOutput,
  IReadCountBySourceOutput,
  IUsersCountByStreakOutput,
  IUsersOutput,
  IUsersReadCountByReadingPeriod,
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

  async getUserCountByStreaks() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT streak, COUNT(id) AS current_streak_count FROM user_streaks GROUP BY streak ORDER BY COUNT(ID) DESC',
    )

    return results as IUsersCountByStreakOutput[]
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

  async getUsersCountByReadingPeriod() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT 
          CASE 
              WHEN HOUR(created_at) BETWEEN 6 AND 11 THEN 'Manhã' 
              WHEN HOUR(created_at) BETWEEN 12 AND 14 THEN 'Almoço' 
              WHEN HOUR(created_at) BETWEEN 15 AND 17 THEN 'Tarde' 
              ELSE 'Noite' 
          END AS reading_period, 
          COUNT(id) AS count
      FROM 
          user_readings 
      GROUP BY 
          reading_period
      `,
    )

    return results as IUsersReadCountByReadingPeriod[]
  }

  async getNewUsersLast7DaysVersusPreviousWeek() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT 
          COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) AS last_7_days_new_users_count,
          COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) AS previous_week_new_users_count,

          CASE 
              WHEN COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) > 0 
                  AND COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) > 0 
              THEN 
                  ROUND(((COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) - COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END)) 
                  / COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END)) * 100, 2)
              ELSE 0
          END AS growth_percentage
        FROM users
      `,
    )

    const newUsers = results as IUsersOutput[]

    return newUsers[0]
  }

  async getReadCountBySource() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT utm_source, COUNT(id) as read_count FROM user_readings GROUP BY utm_source ORDER BY count(id) DESC`,
    )

    return results as IReadCountBySourceOutput[]
  }

  async getReadCountByPost() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      `SELECT id, COUNT(id) as read_count FROM user_readings GROUP BY id ORDER BY id DESC`,
    )

    return results as IReadCountByPostOutput[]
  }
}
