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
            latitude: new Decimal(-3.7358774),
            longitude: new Decimal(-41.0091473),
            created_at: new Date()

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
            userLatitude: -3.7358774,
            userLongitude: -41.0091473,
        })

        expect(checkIn.gym_id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: -3.7358774,
            userLongitude: -41.0091473,
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-id',
                userId: 'user-id',
                userLatitude: -3.7358774,
                userLongitude: -41.0091473,
            })).rejects.toBeInstanceOf(Error)
    })

    it('Should be able to check in twice but in the different days ', async () => {
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: -3.7358774,
            userLongitude: -41.0091473,
        })

        vi.setSystemTime(new Date(2022, 5, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-id',
            userId: 'user-id',
            userLatitude: -3.7358774,
            userLongitude: -41.0091473,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-id-01',
            title: ' JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-3.6777296081087285),
            longitude: new Decimal(-40.968637630135966),
            created_at: new Date()


        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-id-01',
                userId: 'user-id',
                userLatitude: -3.7358774,
                userLongitude: -41.0091473,
            })).rejects.toBeInstanceOf(Error)


    })

})