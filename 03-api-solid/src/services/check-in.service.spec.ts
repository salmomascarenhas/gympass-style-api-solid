import { describe, it, expect, beforeEach } from 'vitest'
import { CheckInsRepository } from '../repositories/check-ins.repository'
import { CheckInService } from './check-in.service'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInService

describe('CheckIn Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)
    })

    it('Should be able create a check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        expect(checkIn.gym_id).toEqual(expect.any(String))
    })

})