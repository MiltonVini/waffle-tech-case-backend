import { Mysql2BadgesRepository } from '@/repositories/mysql2/badges-repository'
import { CreateBadgeUseCase } from '@/use-cases/create-badges'
import { BadgeAlreadyCreateError } from '@/use-cases/errors/badge-already-created-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateBadgeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const badgesRepository = new Mysql2BadgesRepository()
    const useCase = new CreateBadgeUseCase(badgesRepository)

    const createBadgeRepositoryBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      streak_required: z.number(),
    })

    const data = createBadgeRepositoryBodySchema.parse(request.body)

    try {
      await useCase.execute(data)
      return reply.status(201).send()
    } catch (error) {
      if (error instanceof BadgeAlreadyCreateError) {
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
