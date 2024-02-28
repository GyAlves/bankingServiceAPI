
// dependencies
import { randomUUID } from "crypto";

// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling
import { CustomerRegistrationNotFoundError } from "./errors/customer-registration-session-not-found-error";
import { InvalidCustomerRegistrationStepError } from "./errors/wrong-customer-registration-step-error";
import { CustomerRegistrationFailedError } from "./errors/customer-registration-failed-error";
import { CustomerAlreadyExistsError } from "./errors/customer-already-exists-error";

// interfaces
interface ICreateCustomerRequest {
    session_id: string
}

interface ICreateCustomerResponse {
    customer: number[]
}

export class CreateCustomerUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ session_id }: ICreateCustomerRequest): Promise<ICreateCustomerResponse> {

        const session = await this.customersRepository.findRegistrationBySessionId(session_id);

        if (!(session.length > 0)) {
            throw new CustomerRegistrationNotFoundError()
        }

        const {
            customer_cpf,
            customer_registration_step,
            customer_registration_status,
            birth_date,
            email,
            first_name,
            last_name
        } = session[0];

        const customerCpf = `${customer_cpf}`;

        const customerAlreadyExists = await this.customersRepository.findCustomerByCpf(customerCpf);

        if (customerAlreadyExists.length > 0) {
            throw new CustomerAlreadyExistsError();
        }

        const isFinalRegistrationStep = customer_registration_step === "3";

        if (!isFinalRegistrationStep) {

            throw new InvalidCustomerRegistrationStepError();
        }

        const isRegistrationProcessValid = customer_registration_status === "readyForRegistration";

        if (!isRegistrationProcessValid && !isFinalRegistrationStep) {

            await this.customersRepository.updateCustomerRegistration({ customer_registration_status: "failed", sessionId: session_id });

            throw new CustomerRegistrationFailedError();
        }

        const createCustomer = {
            id: randomUUID(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            cpf: customer_cpf,
            birth_date: birth_date,
        }

        const customer = await this.customersRepository.createCustomer(createCustomer);

        return { customer };
    }
}