import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from "../database"

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const transactions = await knex('transactions').select()

        return { transactions }
    })

    app.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = getTransactionParamsSchema.parse(request.params)

        const transaction = await knex('transactions').where('id', id).first()

        return {
            transaction
        }
    })

    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const createTransactionSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionSchema.parse(request.body)

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1
            })

        return reply.status(201).send()
    })
}