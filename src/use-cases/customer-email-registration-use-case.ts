
// dependencies
import { getYear, format } from "date-fns";

// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling
import { CustomerRegistrationNotFoundError } from "./errors/customer-registration-session-not-found-error";
import { InvalidCustomerRegistrationStepError } from "./errors/wrong-customer-registration-step-error";
import { InvalidEmailError } from "./errors/invalid-email-error";

// interfaces
interface ICustomerEmailRegistrationRequest {
    email: string;
    session_id: string;
}

export class CustomerEmailRegistrationUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ email, session_id }: ICustomerEmailRegistrationRequest): Promise<void> {

        const session = await this.customersRepository.findRegistrationBySessionId(session_id);

        if (!(session.length > 0)) {
            throw new CustomerRegistrationNotFoundError()
        }

        const { customer_registration_step } = session[0];

        const isEmailRegistrationStep = customer_registration_step === "2";

        if (!isEmailRegistrationStep) {

            throw new InvalidCustomerRegistrationStepError();
        }

        const isValidEmail = email.length > 15 && email.includes("@");

        if (!isValidEmail) {

            await this.customersRepository.updateCustomerRegistration({ customer_registration_status: "failed", sessionId: session_id });

            throw new InvalidEmailError();
        }

        const customerBirthRegistration = {
            customer_registration_step: "3",
            customer_registration_status: "readyForRegistration",
            email,
            sessionId: session_id
        }

        await this.customersRepository.updateCustomerRegistration(customerBirthRegistration);

    }
}