import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateService } from '@/services/authenticate.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateService = new AuthenticateService(prismaUsersRepository)
        await authenticateService.execute({ email, password })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }


    return reply.status(200).send()
}