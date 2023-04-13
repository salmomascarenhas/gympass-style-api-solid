import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'


export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    /** Authenticated */
    app.get('/me', { onRequest: [verifyJwt] }, profileController)
}