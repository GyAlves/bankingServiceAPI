
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { CreateCustomerUseCase } from "../../use-cases/create-customer";

export function makeCreateCustomerUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new CreateCustomerUseCase(customersRepository)

    return useCase
}