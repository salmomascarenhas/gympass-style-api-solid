export class LateCheckInValidationError extends Error {
    constructor() {
        super('Check-in expired')
    }
}