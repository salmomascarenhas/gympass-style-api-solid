import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) {
    try {
        await request.jwtVerify()
    } catch (error) {
        reply.status(401).send({
            message: 'Unauthorized'
        })
    }
}