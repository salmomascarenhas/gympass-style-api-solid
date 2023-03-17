import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'
export class PrismaUsersRepository implements UsersRepository {

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}