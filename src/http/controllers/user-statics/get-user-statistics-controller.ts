import { Mysql2UserReadingsRepository } from '@/repositories/mysql2/users-reading-repository'
import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { Mysql2UsersStreakRepository } from '@/repositories/mysql2/users-streak-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { GetUserStatisticsUseCase } from '@/use-cases/get-user-statistics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetUserStatisticsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const usersReadingsRepository = new Mysql2UserReadingsRepository()
    const usersStreakRepository = new Mysql2UsersStreakRepository()
    const useCase = new GetUserStatisticsUseCase(
      usersRepository,
      usersReadingsRepository,
      usersStreakRepository,
    )

    const getUserReadingsParamsSchema = z.object({
      email: z.string(),
    })

    const { email } = getUserReadingsParamsSchema.parse(request.query)

    try {
      const userStatistics = await useCase.execute(email)

      return reply.status(200).send({
        streak: userStatistics.userStreak.streak,
        register_days: userStatistics.userRegisterDays,
        read_count: userStatistics.allUserReadingsCount,
        user_favorite_reading_period:
          userStatistics.userFavoriteReadingPeriod.reading_period,
      })
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(409).send({
          message: error.message,
        })
      }

      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        })
      }
      return reply.status(400).send({
        message: 'Error',
      })
    }
  }
}
