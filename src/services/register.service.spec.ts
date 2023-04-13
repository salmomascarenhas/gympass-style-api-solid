import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '../repositories/users.repository'

let usersRepository: UsersRepository
let sut: RegisterService

describe('Register Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })
    it('Should be able to register', async () => {

        const { user } = await sut.execute({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {

        const { user } = await sut.execute({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should not be able to register with same email twice', async () => {

        const email = 'salmo.cruz@gmail.com'

        await sut.execute({
            name: 'Salmo',
            email,
            password: '123456'
        })

        await expect(async () => await sut.execute({
            name: 'Salmo',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})