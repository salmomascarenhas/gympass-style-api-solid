import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate.service'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from '../repositories/users.repository'

let usersRepository: UsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('Should be able to authenticate', async () => {

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