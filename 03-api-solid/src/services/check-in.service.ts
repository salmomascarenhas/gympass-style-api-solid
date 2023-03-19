import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { GymsRepository } from '../repositories/gyms.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetwheenCoordinates } from '../utils/get-distance-betwheen-coordinates'
interface CheckInServiceRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository) { }

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetwheenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitute.toNumber() })

        console.log('distance')
        console.log(distance)
        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkIn }
    }
}