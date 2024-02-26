
// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// model
import { Customer } from "../models/Customer";

// error-handling
import { CustomerNotFoundByCpfError } from "./errors/customer-not-found-by-cpf-error";

// interfaces
interface IGetCustomerProfileUseCaseRequest {
    customer_cpf: string
}

interface IGetCustomerProfileUseCaseResponse {
    customer: Customer | null
}

export class GetCustomerProfileUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ customer_cpf }: IGetCustomerProfileUseCaseRequest): Promise<IGetCustomerProfileUseCaseResponse> {

        const customer = await this.customersRepository.findById(customer_cpf);

        if (!customer?.id) {
            throw new CustomerNotFoundByCpfError();
        }

        return {
            customer
        }

    }
}