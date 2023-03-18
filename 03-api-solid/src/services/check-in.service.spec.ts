import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInsRepository } from '../repositories/check-ins.repository'
import { CheckInService } from './check-in.service'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInService

describe('CheckIn Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        expect(checkIn.gym_id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-id',
                userId: 'user-id'
            })).rejects.toBeInstanceOf(Error)
    })

    it('Should be able to check in twice but in the different days ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        vi.setSystemTime(new Date(2022, 5, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})