import { describe, it, expect } from 'vitest'
import { AuthenticateService } from './authenticate.service'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {
    it('Should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

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

    it('Should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)


        await expect(async () => {
            await sut.execute({
                email: 'salmo.cruz@gmail.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('Should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)


        await usersRepository.create({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password_hash: await hash('123456', 10)
        })

        await expect(async () => {
            await sut.execute({
                email: 'salmo.cruz@gmail.com',
                password: '123123'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})