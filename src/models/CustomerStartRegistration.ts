
// interfaces
import ICustomerStartRegistration from "./interfaces/ICustomerStartRegistration";

export class CustomerStartRegistration implements ICustomerStartRegistration {
    constructor(
        public sessionId: string,
        public customer_cpf: String,
        public customer_registration_step: string,
        public customer_registration_status: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public birth_date?: string,
        public password?: string,
    ) { }
}