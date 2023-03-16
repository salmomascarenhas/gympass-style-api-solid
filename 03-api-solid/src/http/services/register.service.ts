import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

export class RegisterService {
    constructor(private usersRepository: any) { }

    async execute({
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

        // const prismaUsersRepository = new PrismaUsersRepository()

        await this.usersRepository.create({ name, email, password_hash })
    }
}