import { Mysql2UserReadingsRepository } from '@/repositories/mysql2/users-reading-repository'
import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { Mysql2UsersStreakRepository } from '@/repositories/mysql2/users-streak-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { InsertUserReadingUseCase } from '@/use-cases/insert-user-reading-use-case'
import { InsertUserReadingAndUpdateUserStreakUseCase } from '@/use-cases/insert-user-readings-and-update-streak-use-case'
import { UpdateUserStreakUseCase } from '@/use-cases/update-user-streak-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class InsertUserReadingAndUpdateUserStreakController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const usersReadingsRepository = new Mysql2UserReadingsRepository()
    const usersStreakRepository = new Mysql2UsersStreakRepository()

    const insertUserReadingUseCase = new InsertUserReadingUseCase(
      usersRepository,
      usersReadingsRepository,
    )
    const updateUserStreakUseCase = new UpdateUserStreakUseCase(
      usersRepository,
      usersStreakRepository,
      usersReadingsRepository,
    )

    const insertUserReadingAndUpdateUserStreakUseCase =
      new InsertUserReadingAndUpdateUserStreakUseCase(
        insertUserReadingUseCase,
        updateUserStreakUseCase,
      )

    const insertUserReadingBodyParams = z.object({
      id: z.string(),
      email: z.string(),
      status: z.string().optional(),
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_channel: z.string().optional(),
      referring_site: z.string().optional(),
      created_at: z.string().optional(),
    })

    const data = insertUserReadingBodyParams.parse(request.query)

    console.log('Recebendo quey params: ', data)

    try {
      await insertUserReadingAndUpdateUserStreakUseCase.execute(data)

      return reply.status(201).send()
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
