export class InvalidCustomerRegistrationStepError extends Error {
    constructor() {
        super('Wrong registration step')
    }
}