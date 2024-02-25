// dependencies
import { randomUUID } from 'crypto';

// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling

// interfaces
interface IGetCustomerProfileUseCaseRequest {
    customer_cpf: string
}

export class StartCustomerRegistrationUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ customer_cpf }: IGetCustomerProfileUseCaseRequest): Promise<string> {

        const customer = await this.customersRepository.findById(customer_cpf);

        if (customer?.id) {
            throw new Error("Customer already exists");
        }

        const startRegistration = {
            id: randomUUID(),
            sessionId: randomUUID(),
            customer_cpf: customer_cpf.toString(),
            customer_registration_step: "0",
            customer_registration_status: "inProgress",
        }

        await this.customersRepository.customerRegistration(startRegistration);

        return startRegistration.sessionId;
    }
}