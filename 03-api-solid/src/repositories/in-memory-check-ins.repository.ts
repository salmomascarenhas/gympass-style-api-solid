import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from './gyms.repository'
import { randomUUID } from 'node:crypto'
export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym: Gym = {
            id: randomUUID(),
            title: data.title,
            description: data.description ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone ?? null,
            created_at: new Date()
        }

        this.items.push(gym)
        return gym
    }

}