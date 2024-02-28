// dependencies
import { UUID, randomUUID } from 'crypto';

// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling
import { CustomerNotFoundByCpfError } from './errors/customer-not-found-by-cpf-error';

// interfaces
interface IGetCustomerProfileUseCaseRequest {
    customer_cpf: string
}

interface IStartCustomerRegistrationUseCaseResponse {
    sessionId: string
}

export class StartCustomerRegistrationUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ customer_cpf }: IGetCustomerProfileUseCaseRequest): Promise<IStartCustomerRegistrationUseCaseResponse> {

        const customer = await this.customersRepository.findCustomerByCpf(customer_cpf);

        if (!(customer.length > 0)) {
            throw new CustomerNotFoundByCpfError();
        }

        const startRegistration = {
            id: randomUUID(),
            sessionId: randomUUID(),
            customer_cpf: customer_cpf.toString(),
            customer_registration_step: "0",
            customer_registration_status: "inProgress",
        }

        await this.customersRepository.customerStartRegistration(startRegistration);

        const sessionId = startRegistration.sessionId;

        return { sessionId };
    }
}