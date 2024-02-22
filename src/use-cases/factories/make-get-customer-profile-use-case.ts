
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { GetCustomerProfileUseCase } from "../../use-cases/get-customer-profile";

export function makeGetCustomerProfileUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new GetCustomerProfileUseCase(customersRepository)

    return useCase
}