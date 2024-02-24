
// dependencies
import knex from '../../database/database.config';

// models 
import { Customer } from "../../models/Customer";

// interfaces
import IStartCustomerRegistration from "../../interfaces/start-customer-registration-interface";

// repositories
import { ICustomersRepository } from '../customers-repository'

export class KnexCustomersRepository implements ICustomersRepository {

    async findById(id: string): Promise<Customer | any> {

        const query = knex("customers").select();

        const customer = await query.where("id", "=", id).select("*");

        return customer;

    }

    async customerRegistration(registration: IStartCustomerRegistration): Promise<void> {

        await knex("start-customer-registration").insert(registration);

    }
}