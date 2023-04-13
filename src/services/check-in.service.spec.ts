import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in.service'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms.repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('CheckIn Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()

        sut = new CheckInService(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-id',
            title: ' JavaScript Gym',
            description: '',
            phone: '',
            latitude: -3.7358774,
            longitude: -41.0091473,
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
            })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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
        await gymsRepository.create({
            id: 'gym-id-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -3.6777296081087285,
            longitude: -40.968637630135966,
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-id-01',
                userId: 'JavaScript Gym',
                userLatitude: -3.7358774,
                userLongitude: -41.0091473,
            })).rejects.toBeInstanceOf(MaxDistanceError)


    })

})