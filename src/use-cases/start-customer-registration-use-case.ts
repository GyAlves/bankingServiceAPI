// dependencies
import { randomUUID } from 'crypto';

// repositories
import { ICustomersRepository } from "../repositories/customers-repository";

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
            sessionId: randomUUID(),
            customerCpfNumber: customer_cpf.toString(),
            CustomerRegistrationStep: "0",
            CustomerRegistrationStatus: "inProgress",
        }

        await this.customersRepository.customerRegistration(startRegistration);

        return startRegistration.sessionId;
    }
}