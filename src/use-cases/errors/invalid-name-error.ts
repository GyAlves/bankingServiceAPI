export class InvalidNameError extends Error {
    constructor() {
        super('Invalid first name. Too Short.')
    }
}