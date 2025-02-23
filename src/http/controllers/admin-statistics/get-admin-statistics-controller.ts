import { Mysql2AdminStatisticsRepository } from '@/repositories/mysql2/admin-statistics-repository'
import { InvalidStstisticError } from '@/use-cases/errors/invalid-statistic-error'
import { GetAdminStatisticsUseCase } from '@/use-cases/get-admin-statistics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetAdminStatisticsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const adminStatisticsRepository = new Mysql2AdminStatisticsRepository()
    const useCase = new GetAdminStatisticsUseCase(adminStatisticsRepository)

    const getAdminStatisticsParamsSchema = z.object({
      statistic: z.string(),
    })

    const { statistic } = getAdminStatisticsParamsSchema.parse(request.query)

    try {
      const adminStatistics = await useCase.execute(statistic)

      return reply.status(200).send(adminStatistics)
    } catch (error) {
      if (error instanceof InvalidStstisticError) {
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
