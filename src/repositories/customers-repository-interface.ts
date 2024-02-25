
// models 
import { Customer } from "../models/Customer";
import { CustomerStartRegistration } from "../models/CustomerStartRegistration";

export interface ICustomersRepository {
    findById(id: string): Promise<Customer | null>
    customerRegistration(registration: object): Promise<void>
    findRegistrationBySessionId(sessionId: string): Promise<CustomerStartRegistration[] | []>
    updateCustomerRegistration(registration: object): Promise<void>
}