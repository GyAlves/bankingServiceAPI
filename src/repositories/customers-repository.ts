
// models 
import { Customer } from "../models/Customer";

export interface ICustomersRepository {
    findById(id: string): Promise<Customer | null>
    customerRegistration(registration: object): Promise<void>
}