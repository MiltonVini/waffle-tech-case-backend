import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { RegisterUserUseCase } from '@/use-cases/register-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const useCase = new RegisterUserUseCase(usersRepository)

    const registerUserParams = z.object({
      email: z.string().email(),
    })

    const { email } = registerUserParams.parse(request.body)

    try {
      await useCase.execute(email)

      return reply.status(201).send()
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
