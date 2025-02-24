import { FastifyInstance } from 'fastify'
import { GetUserStatisticsController } from './get-user-statistics-controller'

const getUserStatisticsController = new GetUserStatisticsController()

export async function getUserStatisticsRoutes(app: FastifyInstance) {
  app.get('/statistics', getUserStatisticsController.handle)
}
