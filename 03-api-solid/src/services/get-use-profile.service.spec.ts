import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileService } from './get-user-profile.service'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: UsersRepository
let sut: GetUserProfileService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it('Should be able to get user profile', async () => {

        const createdUser = await usersRepository.create({
            name: 'Salmo',
            email: 'salmo.cruz@gmail.com',
            password_hash: await hash('123456', 10)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual(createdUser.name)
    })

    it('Should not be able to get user profile with wrong id', async () => {

        await expect(async () => {
            await sut.execute({
                userId: 'non-exist-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})