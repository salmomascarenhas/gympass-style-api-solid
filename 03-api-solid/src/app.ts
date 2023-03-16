import fastfy from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastfy()

app.register(appRoutes)
