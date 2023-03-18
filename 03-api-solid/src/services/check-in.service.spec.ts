import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in.service'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '../repositories/in-memory-check-ins.repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('CheckIn Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()

        sut = new CheckInService(checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'gym-id',
            title: ' JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitute: new Decimal(0)

        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.gym_id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-id',
                userId: 'user-id',
                userLatitude: 0,
                userLongitude: 0,
            })).rejects.toBeInstanceOf(Error)
    })

    it('Should be able to check in twice but in the different days ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2022, 5, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})