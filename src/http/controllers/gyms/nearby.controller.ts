import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsService } from '../../../services/factories/make-fetch-nearby-gyms-service'

export async function nearbyController(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsService = makeFetchNearbyGymsService()

    const { gyms } = await fetchNearbyGymsService.execute({
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({
        gyms,
    })
}