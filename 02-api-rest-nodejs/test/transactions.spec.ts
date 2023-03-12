import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close
    })

    // Executamos antes de CADA test para que possamos tarná-los independentes.
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all')
        execSync('npm run knex -- migrate:latest')
    })

    it('Sould be able to user create a new transaction', async () => {
        await request(app.server)
            .post('/transactions').send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })

    it('Should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions').send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        ])

    })

    it('Should be able to get specific transaction', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions').send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        const transactionId = listTransactionResponse.body.transactions[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        )

    })

    it('Should be able to get summary', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions').send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'New Transaction',
                amount: 3000,
                type: 'debit'
            })

        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)


        expect(summaryResponse.body.summary).toEqual({
            amount: 2000
        })

    })
})