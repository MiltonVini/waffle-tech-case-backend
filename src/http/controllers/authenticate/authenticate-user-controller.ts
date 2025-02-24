import { Mysql2UsersRepository } from '@/repositories/mysql2/users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate-user-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from 'process'
import { z } from 'zod'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new Mysql2UsersRepository()
    const useCase = new AuthenticateUserUseCase(usersRepository)

    const authenticateParamsSchema = z.object({
      email: z.string().email(),
    })

    const { email } = authenticateParamsSchema.parse(request.query)

    try {
      const userFound = await useCase.execute(email)

      if (userFound) {
        const authToken = await reply.jwtSign(
          {
            email: userFound.email,
          },
          {
            sign: {
              sub: userFound.id,
            },
          },
        )

        const autoLoginLink = `${env.FRONTEND_URL}/auth?token=${authToken}`

        return reply.status(200).send({
          message: 'Valid user',
          authToken,
          autoLogin: autoLoginLink,
        })
      }
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({
          message: error.message,
        })
      }

      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      return reply.status(500).send({
        message: 'Internal Server Error',
      })
    }
  }
}
