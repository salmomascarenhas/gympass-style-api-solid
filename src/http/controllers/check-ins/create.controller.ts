import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function createController(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const checkInUseCase = makeCheckInService()

    await checkInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(201).send()
}