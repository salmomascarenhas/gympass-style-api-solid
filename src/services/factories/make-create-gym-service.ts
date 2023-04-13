import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms.repository'
import { CreateGymService } from '../create-gym.service'
export function makeCreateGymserice() {
    const gymsRepository = new PrismaGymsRepository()
    const service = new CreateGymService(gymsRepository)

    return service
}