import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { historyController } from './history.controller'
import { metricsController } from './metrics.controller'
import { createController } from './create.controller'
import { validateController } from './validate.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'


export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/history', historyController)
    app.get('/check-ins/metrics', metricsController)

    app.post('/gyms/:gymId/check-ins', createController)
    app.patch(
        '/check-ins/:checkInId/validate',
        { onRequest: [verifyUserRole('ADMIN')] },
        validateController,
    )
}