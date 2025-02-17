import { FastifyInstance } from 'fastify'
import { AuthenticateUserController } from './authenticate-user-controller'

const authenticateUserController = new AuthenticateUserController()

export async function authenticateUserRoutes(app: FastifyInstance) {
  app.get('/authenticate', authenticateUserController.handle)
}
