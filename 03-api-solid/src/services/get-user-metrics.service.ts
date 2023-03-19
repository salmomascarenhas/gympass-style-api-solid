import { CheckInsRepository } from '@/repositories/check-ins.repository'
interface GetUserMetricsRequest {
    userId: string
}

interface GetUserMetricsResponse {
    userMetrics: number
}

export class GetUserMetrics {
    constructor(
        private checkInsRepository: CheckInsRepository,) { }

    async execute({
        userId
    }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
        const userMetrics = await this.checkInsRepository.getUserMetrics(userId)

        return { userMetrics }
    }
}