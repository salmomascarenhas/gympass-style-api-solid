import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function createController(request: FastifyRequest, reply: FastifyReply) {
    const createGymServiceBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, phone, latitude, longitude } = createGymServiceBodySchema.parse(request.body)


    const createGymService = makeCreateGymService()
    await createGymService.execute({
        title,
        description,
        phone,
        latitude,
        longitude
    })


    return reply.status(201).send()
}