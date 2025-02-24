import { Mysql2BadgesRepository } from '@/repositories/mysql2/badges-repository'
import { GetBadgesUseCase } from '@/use-cases/get-badges-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetBadgesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const badgesRepository = new Mysql2BadgesRepository()
    const useCase = new GetBadgesUseCase(badgesRepository)

    try {
      const badges = await useCase.execute()
      return reply.status(200).send(badges)
    } catch (error) {
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
