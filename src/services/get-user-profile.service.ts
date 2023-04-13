import { UsersRepository } from '../repositories/users.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { User } from '@prisma/client'

interface GetUserProfileServiceRequest {
    userId: string
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}