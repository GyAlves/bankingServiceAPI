
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { CustomerEmailRegistrationUseCase } from "../../use-cases/customer-email-registration-use-case";

export function makeCustomerEmailRegistrationUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new CustomerEmailRegistrationUseCase(customersRepository)

    return useCase
}