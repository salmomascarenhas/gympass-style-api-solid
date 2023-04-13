import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateSerivce } from '@/services/factories/make-authenticate-service'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateService = makeAuthenticateSerivce()
        const { user } = await authenticateService.execute({ email, password })

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                }
            })

        return reply.status(200).send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }


}