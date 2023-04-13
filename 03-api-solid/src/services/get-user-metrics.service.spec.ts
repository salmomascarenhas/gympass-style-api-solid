import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins.repository'
import { GetUserMetricsService } from './get-user-metrics.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository)
    })

    it('Should be able to get user metrics', async () => {

        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { userMetrics } = await sut.execute({
            userId: 'user-01'
        })

        expect(userMetrics).toEqual(2)

    })

})