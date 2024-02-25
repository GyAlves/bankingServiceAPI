
// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling

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
            throw new Error("Registration not found")
        }

        const isNameRegistrationStep = session.customer_registration_step === "0";

        if (!isNameRegistrationStep) {
            throw new Error("Wrong registration step")
        }

        const validFirstName = first_name.length < 3 ? false : first_name.toLowerCase();
        const validLastName = last_name.length < 3 ? false : last_name.toLowerCase();

        if (!validFirstName || !validLastName) {
            throw new Error("Invalid first and/or last name")
        }

        const customerRegistration = {
            customer_registration_step: "1",
            first_name: validFirstName,
            last_name: validLastName,
        }

        await this.customersRepository.updateCustomerRegistration(customerRegistration);
    }
}