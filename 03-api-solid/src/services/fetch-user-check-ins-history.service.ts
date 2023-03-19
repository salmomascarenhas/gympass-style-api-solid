import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
interface FetchUserCheckInsHistoryRequest {
    userId: string,
    page: number
}

interface FetchUserCheckInsHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory {
    constructor(
        private checkInsRepository: CheckInsRepository,) { }

    async execute({
        userId,
        page }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
        if (!checkIns) {
            throw new ResourceNotFoundError()
        }

        return { checkIns }
    }
}