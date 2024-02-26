export class CustomerNotFoundByCpfError extends Error {
    constructor() {
        super('Customer not found')
    }
}