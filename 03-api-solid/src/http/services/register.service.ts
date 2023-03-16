import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '../repositories/prisma-users.repository'
interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

export async function registerService({
    name,
    email,
    password }: RegisterUserServiceRequest) {

    const password_hash = await hash(password, 10)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('Email already exists!')
    }

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({ name, email, password_hash })
}