import { FastifyInstance } from 'fastify'
import { AuthenticateUserController } from './authenticate-user-controller'
import { VerifyTokenController } from './verify-token-controller'

const authenticateUserController = new AuthenticateUserController()
const verifyTokenController = new VerifyTokenController()

export async function authenticateUserRoutes(app: FastifyInstance) {
  app.get('/authenticate', authenticateUserController.handle)
  app.get('/authenticate/verify-token', verifyTokenController.handle)
}
