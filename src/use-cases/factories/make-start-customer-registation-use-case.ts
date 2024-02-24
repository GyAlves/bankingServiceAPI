
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { StartCustomerRegistrationUseCase } from "../../use-cases/start-customer-registration-use-case";

export function makeStartCustomerRegistrationUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new StartCustomerRegistrationUseCase(customersRepository)

    return useCase
}