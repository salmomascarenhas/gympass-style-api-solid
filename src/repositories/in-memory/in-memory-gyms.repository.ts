import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms.repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetwheenCoordinates } from '../../utils/get-distance-betwheen-coordinates'
export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
        return this.items
            .filter(item => {
                const distance = getDistanceBetwheenCoordinates(
                    {
                        latitude: params.latitude,
                        longitude: params.longitude
                    },
                    {
                        latitude: item.latitude.toNumber(),
                        longitude: item.longitude.toNumber()
                    }
                )

                return distance < 10
            })

    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.items
            .filter(item => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
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