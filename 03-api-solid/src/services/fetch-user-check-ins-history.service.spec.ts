import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'
import { FetchUserCheckInsHistory } from './fetch-user-check-ins-history.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistory

describe('Fetch User Check-in History Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistory(checkInsRepository)
    })

    it('Should be able to fetch user ckeck-in history', async () => {

        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])

    })

    it('Should be able to fetch paginated user check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])

    })

})