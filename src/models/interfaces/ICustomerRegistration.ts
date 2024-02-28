
export default interface ICustomerRegistration {
    sessionId?: string;
    customer_cpf?: String;
    customer_registration_step?: string;
    customer_registration_status?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    birth_date?: string;
    password?: string;
}