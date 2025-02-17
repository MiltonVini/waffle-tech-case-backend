import { Mysql2UserReadingsRepository } from '@/repositories/mysql2/users-reading-repository'
import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { InsertUserReadingUseCase } from '@/use-cases/insert-user-reading-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class InsertUserReadingsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const usersReadingsRepository = new Mysql2UserReadingsRepository()
    const useCase = new InsertUserReadingUseCase(
      usersRepository,
      usersReadingsRepository,
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
      await useCase.execute(data)

      return reply.status(201).send()
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        return reply.status(400).send({
          message: error.message,
        })
      }
      console.log(error)
      return reply.status(400).send({
        message: 'Error',
      })
    }
  }
}
