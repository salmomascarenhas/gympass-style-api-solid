import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateService } from '@/services/authenticate.service'

export function makeAuthenticateSerivce() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(prismaUsersRepository)

    return authenticateService
}