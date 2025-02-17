import { Mysql2UserReadingsRepository } from '@/repositories/mysql2/users-reading-repository'
import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { GetUserReadingsUseCase } from '@/use-cases/get-user-readings-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetUserReadingsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const usersReadingsRepository = new Mysql2UserReadingsRepository()
    const useCase = new GetUserReadingsUseCase(
      usersRepository,
      usersReadingsRepository,
    )

    const getUserReadingsParamsSchema = z.object({
      email: z.string(),
    })

    const { email } = getUserReadingsParamsSchema.parse(request.query)

    try {
      const userReadings = await useCase.execute(email)

      return reply.status(200).send(userReadings)
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
