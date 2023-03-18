import { Gym } from '@prisma/client'
import { GymsRepository } from './gyms.repository'
export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }
    // async create(data: Prisma.CheckInUncheckedCreateInput) {
    //     const checkIn: CheckIn = {
    //         id: randomUUID(),
    //         user_id: data.user_id,
    //         gym_id: data.gym_id,
    //         validated_at: data.validated_at ? new Date(data.validated_at) : null,
    //         created_at: new Date(),
    //     }

    //     this.items.push(checkIn)
    //     return checkIn
    // }

}