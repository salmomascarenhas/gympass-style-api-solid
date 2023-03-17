import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {

        const password_hash = await hash(password, 10)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({ name, email, password_hash })

        return {
            user
        }
    }
}