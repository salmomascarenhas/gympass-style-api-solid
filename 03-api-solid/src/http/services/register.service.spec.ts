import { describe, it, expect } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
    it('Should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.execute({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.execute({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should note be able to register withe same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const email = 'salmo.cruz@gmail.com'

        await registerService.execute({
            name: 'Salmo',
            email,
            password: '123456'
        })

        expect(() => registerService.execute({
            name: 'Salmo',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})