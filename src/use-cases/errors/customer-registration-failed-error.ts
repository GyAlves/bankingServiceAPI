export class CustomerRegistrationFailedError extends Error {
    constructor() {
        super('Customer registration failed. Please try again')
    }
}