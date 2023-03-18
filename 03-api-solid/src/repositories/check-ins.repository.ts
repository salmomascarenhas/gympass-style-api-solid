import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}