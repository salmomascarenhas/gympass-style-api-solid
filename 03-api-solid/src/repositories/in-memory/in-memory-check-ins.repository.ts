import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins.repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = []

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if (checkInIndex === -1) {
            throw new Error('Check-in not found')
        }

        this.items[checkInIndex] = checkIn

        return checkIn
    }

    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = this.items.find(item => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async getUserMetrics(userId: string): Promise<number> {
        return this.items.filter(item => item.user_id === userId).length
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.items
            .filter(item => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInSameDate = this.items.find(item => {
            const checkInDate = dayjs(item.created_at)
            const isOnSameDate =
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay) // DD-MM-YYYYT00:00:00 < checkInDate < DD-MM-YYYYT23:59:59

            return item.user_id === userId && isOnSameDate
        })

        if (!checkInSameDate) {
            return null
        }

        return checkInSameDate
    }


    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)
        return checkIn
    }

}