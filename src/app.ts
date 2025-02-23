import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { userReadingsRoutes } from './http/controllers/user-readings/routes'
import { authenticateUserRoutes } from './http/controllers/authenticate/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { getUserStatisticsRoutes } from './http/controllers/user-statics/routes'
import { getAdminStatisticsRoutes } from './http/controllers/admin-statistics/routes'
import cors from '@fastify/cors'
import { createBagdeRoutes } from './http/controllers/badges/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.EXPIRES_IN_TOKEN,
  },
})

app.register(userRoutes)
app.register(userReadingsRoutes)
app.register(authenticateUserRoutes)
app.register(getUserStatisticsRoutes)
app.register(getAdminStatisticsRoutes)
app.register(createBagdeRoutes)
