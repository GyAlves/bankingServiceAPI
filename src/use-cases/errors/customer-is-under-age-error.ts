export class CustomerIsUnderAgeError extends Error {
    constructor() {
        super('Customer is under age');
    }
}