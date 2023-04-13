import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms.repository'
import { GymsRepository } from '../repositories/gyms.repository'
import { SearchGymsService } from './search-gyms.service'

let gymsRepository: GymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsService(gymsRepository)
    })

    it('Should be able to search for gym', async () => {

        await gymsRepository.create({
            title: `TypeScript Gym`,
            description: '',
            phone: '',
            latitude: -3.6777296081087285,
            longitude: -40.968637630135966
        })

        await gymsRepository.create({
            title: `JavaScript Gym`,
            description: '',
            phone: '',
            latitude: -3.6777296081087285,
            longitude: -40.968637630135966
        })

        const { gyms } = await sut.execute({
            query: 'Gym',
            page: 1,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'TypeScript Gym' }),
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ])
    })

    it('Should be able to paginated result gyms', async () => {
        for (let i = 1; i <= 23; i++) {
            await gymsRepository.create({
                title: `JavaScript ${i}`,
                description: '',
                phone: '',
                latitude: -3.6777296081087285,
                longitude: -40.968637630135966
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2,
        })

        expect(gyms).toHaveLength(3)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript 21' }),
            expect.objectContaining({ title: 'JavaScript 22' }),
            expect.objectContaining({ title: 'JavaScript 23' }),
        ])
    })
})