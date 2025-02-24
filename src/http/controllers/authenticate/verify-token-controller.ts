import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'

import { verify } from 'jsonwebtoken'

const jwtSecret = env.JWT_SECRET

export class VerifyTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.headers.authorization)

    try {
      const authToken = request.headers.authorization

      if (!authToken) {
        return reply.status(401).send({
          message: 'Invalid token',
        })
      }

      const token = authToken.split(' ')[1]
      try {
        verify(token, String(jwtSecret))

        return reply.status(200).send({
          message: 'Valid token',
        })
      } catch (error) {
        return reply.status(401).send({
          message: 'Invalid token',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
