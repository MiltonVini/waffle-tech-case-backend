import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { userReadingsRoutes } from './http/controllers/user-readings/routes'
import { authenticateUserRoutes } from './http/controllers/authenticate/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { getUserStatisticsRoutes } from './http/controllers/user-statistics/routes'
import { getAdminStatisticsRoutes } from './http/controllers/admin-statistics/routes'
import cors from '@fastify/cors'
import { createBagdeRoutes } from './http/controllers/badges/routes'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'

export const app = fastify()

app.register(cors, {
  origin: 'http://127.0.0.1:5173',
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.EXPIRES_IN_TOKEN,
  },
})

app.register(authenticateUserRoutes)

app.register(async (protectedRoutes) => {
  protectedRoutes.addHook('preHandler', ensureAuthenticated)

  protectedRoutes.register(userRoutes)
  protectedRoutes.register(userReadingsRoutes)
  protectedRoutes.register(getUserStatisticsRoutes)
  protectedRoutes.register(createBagdeRoutes)
})

app.register(getAdminStatisticsRoutes)

export const startApp = async () => {
  await app.listen({
    port: 3000, // Definindo a porta
    host: '0.0.0.0', // Host pode ser configurado, geralmente '0.0.0.0' para testes
  })
  return app
}
