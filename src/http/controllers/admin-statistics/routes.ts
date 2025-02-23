import { FastifyInstance } from 'fastify'
import { GetAdminStatisticsController } from './get-admin-statistics-controller'

const getAdminStatisticsController = new GetAdminStatisticsController()

export async function getAdminStatisticsRoutes(app: FastifyInstance) {
  app.get('/admin/statistics', getAdminStatisticsController.handle)
}
