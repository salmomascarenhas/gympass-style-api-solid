import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
}