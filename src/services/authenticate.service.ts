import { UsersRepository } from '../repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AutheticateServiceRequest {
    email: string
    password: string
}

interface AutheticateServiceResponse {
    user: User
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        password
    }: AutheticateServiceRequest): Promise<AutheticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash,)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}