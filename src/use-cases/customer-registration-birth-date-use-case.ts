
// dependencies
import { getYear, format } from "date-fns";

// repositories
import { ICustomersRepository } from "../repositories/customers-repository-interface";

// error-handling
import { CustomerRegistrationNotFoundError } from "./errors/customer-registration-session-not-found-error";
import { InvalidCustomerRegistrationStepError } from "./errors/wrong-customer-registration-step-error";
import { CustomerIsUnderAgeError } from "./errors/customer-is-under-age-error";

// interfaces
interface ICustomerRegistrationBirthdateRequest {
    birth_date: string;
    session_id: string;
}

export class CustomerRegistrationBirthdateUseCase {

    constructor(private customersRepository: ICustomersRepository) { }

    async execute({ birth_date, session_id }: ICustomerRegistrationBirthdateRequest): Promise<void> {

        const [session] = await this.customersRepository.findRegistrationBySessionId(session_id);

        if (!session.sessionId) {
            throw new CustomerRegistrationNotFoundError()
        }

        const isBirthdateRegistrationStep = session.customer_registration_step === "1";

        if (!isBirthdateRegistrationStep) {

            throw new InvalidCustomerRegistrationStepError();
        }

        const currentYear = getYear(format(new Date(), "yyyy-MM-dd"));
        const customerBirthdayYear = getYear(format(birth_date, "yyyy-MM-dd"));

        const isAdult = (currentYear - customerBirthdayYear) > 18;

        if (!isAdult) {

            await this.customersRepository.updateCustomerRegistration({ customer_registration_status: "failed" });

            throw new CustomerIsUnderAgeError();
        }


        const customerBirthRegistration = {
            customer_registration_step: "2",
            customer_registration_status: "inProgress",
            birth_date,
            sessionId: session_id
        }

        await this.customersRepository.updateCustomerRegistration(customerBirthRegistration);

    }
}