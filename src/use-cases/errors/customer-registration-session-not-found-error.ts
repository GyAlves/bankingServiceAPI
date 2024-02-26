export class CustomerRegistrationNotFoundError extends Error {
    constructor() {
        super('Registration not found')
    }
}