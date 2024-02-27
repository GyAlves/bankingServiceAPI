export class InvalidEmailError extends Error {
    constructor() {
        super('Email is not valid')
    }
}