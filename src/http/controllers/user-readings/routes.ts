import { FastifyInstance } from 'fastify'
import { GetUserReadingsController } from './get-user-readings-controller'
import { InsertUserReadingAndUpdateUserStreakController } from './insert-user-reading-and-update-user-streak-controller'

const getUserReadings = new GetUserReadingsController()
const insertUserReadingAndUpdateUserStreakController =
  new InsertUserReadingAndUpdateUserStreakController()

export async function userReadingsRoutes(app: FastifyInstance) {
  app.get(
    '/user/readings',
    insertUserReadingAndUpdateUserStreakController.handle,
  )
  app.get('/', insertUserReadingAndUpdateUserStreakController.handle)
  app.get('/readings', getUserReadings.handle)
}
