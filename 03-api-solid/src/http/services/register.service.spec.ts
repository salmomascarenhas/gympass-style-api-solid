import { describe, it, expect } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
    it('Should hash user password upon registration', async () => {
        const registerService = new RegisterService({
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            },
        })

        const { user } = await registerService.execute({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})