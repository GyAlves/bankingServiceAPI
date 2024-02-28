
// interfaces
import ICustomerRegistration from "./interfaces/ICustomerRegistration";

export class CustomerRegistration implements ICustomerRegistration {
    constructor(
        public sessionId?: string,
        public customer_cpf?: String,
        public customer_registration_step?: string,
        public customer_registration_status?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public birth_date?: string,
        public password?: string,
    ) { }
}