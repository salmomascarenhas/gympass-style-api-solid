import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password }: RegisterUserServiceRequest) {

        const password_hash = await hash(password, 10)

        const user = await this.usersRepository.findByEmail(email)

        if (user) {
            throw new UserAlreadyExistsError()
        }

        // const prismaUsersRepository = new PrismaUsersRepository()

        await this.usersRepository.create({ name, email, password_hash })
    }
}