import { makeValidateCheckInService } from '@/services/factories/validate-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateController(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInService = makeValidateCheckInService()

    await validateCheckInService.execute({
        checkInId,
    })

    return reply.status(204).send()
}