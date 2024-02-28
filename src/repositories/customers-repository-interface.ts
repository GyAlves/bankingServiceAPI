
// models 
import { Customer } from "../models/Customer";
import { CustomerRegistration } from "../models/CustomerStartRegistration";

export interface ICustomersRepository {
    findById(id: string): Promise<Customer[] | []>
    findCustomerByCpf(cpf: string): Promise<Customer[] | []>
    customerStartRegistration(registration: CustomerRegistration): Promise<number[]>
    findRegistrationBySessionId(sessionId: string): Promise<CustomerRegistration[] | []>
    updateCustomerRegistration(registration: CustomerRegistration): Promise<void>
    createCustomer(customer: object): Promise<number[]>
}