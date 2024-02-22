
// dependencies
import knex from '../../database/database.config';

// models 
import { Customer } from "../../models/Customer";

// repositories
import { CustomersRepository } from '../customers-repository'

export class KnexCustomersRepository implements CustomersRepository {

    async findById(id: string): Promise<Customer | any> {

        const query = knex("customers").select();

        const customer = await query.where("id", "=", id).select("*");

        return customer;

    }
}