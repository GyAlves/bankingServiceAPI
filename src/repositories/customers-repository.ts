
// models 
import { Customer } from "../models/Customer";

export interface CustomersRepository {
    findById(id: string): Promise<Customer | null>
}