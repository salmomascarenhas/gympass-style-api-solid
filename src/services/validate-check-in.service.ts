
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins.repository'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
interface ValidateCheckInServiceRequest {
    checkInId: string
}

interface ValidateCheckInServiceResponse {
    checkIn: CheckIn
}

export class ValidateCheckInService {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({
        checkInId
    }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new Error('Check-in not found')

        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date())
            .diff(checkIn.created_at, 'minutes')

        console.log(distanceInMinutesFromCheckInCreation)

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}