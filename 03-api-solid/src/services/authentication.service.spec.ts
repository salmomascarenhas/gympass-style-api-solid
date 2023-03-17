import { describe, it, expect } from 'vitest'
import { AutheticationService } from './authentication.service'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { hash } from 'bcryptjs'

describe('Authentication Service', () => {
    it('Should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AutheticationService(usersRepository)

        await usersRepository.create({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password_hash: await hash('123456', 10)
        })

        const { user } = await sut.execute({
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
})