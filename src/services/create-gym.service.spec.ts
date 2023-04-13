import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms.repository'
import { GymsRepository } from '../repositories/gyms.repository'
import { CreateGymService } from './create-gym.service'

let gymsRepository: GymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymsRepository)
    })
    it('Should be able to create gym', async () => {

        const { gym } = await sut.execute({
            title: ' JavaScript Gym',
            description: '',
            phone: '',
            latitude: -3.6777296081087285,
            longitude: -40.968637630135966
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})