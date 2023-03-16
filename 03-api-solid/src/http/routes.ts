import { FastifyInstance } from "fastify"
import { register } from "./controllers/register.controller"

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)

}
