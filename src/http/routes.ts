import { FastifyInstance } from "fastify"
import { registerController } from "./controllers/register.controller"
import { authenticateController } from "./controllers/authenticate.controller"
import { profileController } from "./controllers/profile.controller"
import { verifyJwt } from "./middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    /**  Authenticated routes */
    app.get('/me', { onRequest: [verifyJwt] }, profileController)

}
