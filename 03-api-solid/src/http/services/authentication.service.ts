import { UsersRepository } from '../repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AutheticationServiceRequest {
    email: string
    password: string
}

interface AutheticationServiceResponse {
    user: User
}

export class AutheticationService {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute({
        email,
        password
    }: AutheticationServiceRequest): Promise<AutheticationServiceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(user.password_hash, password)

        if (!doesPasswordMatches)
            throw new InvalidCredentialsError()

        return { user }
    }
}