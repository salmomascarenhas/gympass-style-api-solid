import { UsersRepository } from '../users.repository'
import { User, Prisma } from '@prisma/client'
export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id)

        console.log(user)
        if (!user)
            return null

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        console.log(user)
        if (!user)
            return null

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)
        console.log('+++++++create++++++++')
        console.log(this.items)
        return user
    }

}