
// repositories
import { CustomersRepository } from "../repositories/customers-repository";

// model
import { Customer } from "../models/Customer";

// error-handling

// interfaces
interface IGetCustomerProfileUseCaseRequest {
    customer_id: string
}

interface IGetCustomerProfileUseCaseResponse {
    customer: Customer | null
}

export class GetCustomerProfileUseCase {

    constructor(private customersRepository: CustomersRepository) { }

    async execute({ customer_id }: IGetCustomerProfileUseCaseRequest): Promise<IGetCustomerProfileUseCaseResponse> {

        const customer = await this.customersRepository.findById(customer_id);

        if (!customer) {
            console.log("Customer not found")
        }

        return {
            customer
        }

    }
}