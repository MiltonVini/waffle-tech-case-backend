import { Mysql2BadgesRepository } from '@/repositories/mysql2/badges-repository'
import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { GetUserBadgesUseCase } from '@/use-cases/get-user-badges-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetUserBadgesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const badgesRepository = new Mysql2BadgesRepository()
    const useCase = new GetUserBadgesUseCase(badgesRepository, usersRepository)

    const getUserBadgesParamsSchema = z.object({
      email: z.string().email(),
    })

    const { email } = getUserBadgesParamsSchema.parse(request.query)

    try {
      const badges = await useCase.execute(email)
      return reply.status(200).send(badges)
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
