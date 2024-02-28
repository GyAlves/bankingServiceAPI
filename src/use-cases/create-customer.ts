
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

export class CreateCustomerUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ session_id }: ICreateCustomerRequest): Promise<number[]> {

        const [session] = await this.customersRepository.findRegistrationBySessionId(session_id);

        if (!session.sessionId) {
            throw new CustomerRegistrationNotFoundError()
        }

        const customerCpf = `${session.customer_cpf}`;

        const customerAlreadyExists = await this.customersRepository.findCustomerByCpf(customerCpf);

        if (customerAlreadyExists.length > 0) {
            throw new CustomerAlreadyExistsError();
        }

        const isFinalRegistrationStep = session.customer_registration_step === "3";

        if (!isFinalRegistrationStep) {

            throw new InvalidCustomerRegistrationStepError();
        }

        const isRegistrationProcessValid = session.customer_registration_status === "readyForRegistration";

        if (!isRegistrationProcessValid && !isFinalRegistrationStep) {

            await this.customersRepository.updateCustomerRegistration({ customer_registration_status: "failed" });

            throw new CustomerRegistrationFailedError();
        }

        const createCustomer = {
            id: randomUUID(),
            first_name: session.first_name,
            last_name: session.last_name,
            email: session.email,
            cpf: session.customer_cpf,
            birth_date: session.birth_date,
        }

        const customer = await this.customersRepository.createCustomer(createCustomer);

        return customer;
    }
}