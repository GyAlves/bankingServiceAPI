
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { CustomerRegistrationNameUseCase } from "../../use-cases/customer-registration-name-use-case";

export function makeCustomerRegistrationNameUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new CustomerRegistrationNameUseCase(customersRepository)

    return useCase
}