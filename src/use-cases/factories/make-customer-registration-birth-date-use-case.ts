
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { CustomerRegistrationBirthdateUseCase } from "../../use-cases/customer-registration-birth-date-use-case";

export function makeCustomerRegistrationBirthdateUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new CustomerRegistrationBirthdateUseCase(customersRepository)

    return useCase
}