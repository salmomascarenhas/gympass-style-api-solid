import { FastifyInstance } from "fastify"
import { authenticateController } from "./authenticate.controller"
import { profileController } from "./profile.controller"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { registerController } from "./register.controller"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    /**  Authenticated routes */
    app.get('/me', { onRequest: [verifyJwt] }, profileController)

}
