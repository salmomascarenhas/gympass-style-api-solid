import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsService } from '../../../services/factories/make-search-gyms-service'

export async function searchController(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = searchGymsQuerySchema.parse(request.query)

    const searchGymsUseCase = makeSearchGymsService()

    const { gyms } = await searchGymsUseCase.execute({
        query: q,
        page,
    })

    return reply.status(200).send({
        gyms,
    })
}