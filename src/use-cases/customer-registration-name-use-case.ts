
// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling
import { CustomerRegistrationNotFoundError } from "./errors/customer-registration-session-not-found-error";
import { InvalidNameError } from "./errors/invalid-name-error";
import { InvalidCustomerRegistrationStepError } from "./errors/wrong-customer-registration-step-error";

// interfaces
interface ICustomerRegistrationNameRequest {
    first_name: string,
    last_name: string,
    session_id: string,
}

export class CustomerRegistrationNameUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ first_name, last_name, session_id }: ICustomerRegistrationNameRequest): Promise<void> {

        const [session] = await this.customersRepository.findRegistrationBySessionId(session_id);

        if (!session.sessionId) {
            throw new CustomerRegistrationNotFoundError()
        }

        const isNameRegistrationStep = session.customer_registration_step === "0";

        if (!isNameRegistrationStep) {
            throw new InvalidCustomerRegistrationStepError();
        }

        const validFirstName = first_name.length < 3 ? false : first_name.toLowerCase();

        if (!validFirstName) {
            throw new InvalidNameError()
        }

        const validLastName = last_name.length < 3 ? false : last_name.toLowerCase();

        if (!validLastName) {
            throw new InvalidNameError()
        }

        const customerRegistration = {
            customer_registration_step: "1",
            first_name: validFirstName,
            last_name: validLastName,
        }

        await this.customersRepository.updateCustomerRegistration(customerRegistration);
    }
}