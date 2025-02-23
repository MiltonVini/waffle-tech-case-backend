import { FastifyInstance } from 'fastify'
import { CreateBadgeController } from './create-badge-controller'
import { GetUserBadgesController } from './get-user-badges-controller'
import { GetBadgesController } from './get-badges-controller'

const createBadgeController = new CreateBadgeController()
const getUserBadgesController = new GetUserBadgesController()
const getBadges = new GetBadgesController()

export async function createBagdeRoutes(app: FastifyInstance) {
  app.post('/badge', createBadgeController.handle)
  app.get('/badge/user', getUserBadgesController.handle)
  app.get('/badge', getBadges.handle)
}
