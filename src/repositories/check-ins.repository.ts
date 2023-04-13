import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
    save(checkIn: CheckIn): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
    getUserMetrics(userId: string): Promise<number>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>

}