import { FastifyInstance } from 'fastify'
import { RegisterUserController } from './register-user-controller'

const registerUserController = new RegisterUserController()

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', registerUserController.handle)
}
