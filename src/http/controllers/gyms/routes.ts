import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { searchController } from "./search.controller"
import { nearbyController } from "./nearby.controller"
import { createController } from "./create.controller"

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/gyms/search', searchController)
    app.get('/gyms/nearby', nearbyController)

    app.post('/gyms', createController)
}
