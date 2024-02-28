
// dependencies
import knex from '../../database/database.config';

// models 
import { Customer } from "../../models/Customer";
import { CustomerStartRegistration } from "../../models/CustomerStartRegistration";

// repositories
import { ICustomersRepository } from '../customers-repository-interface'

export class KnexCustomersRepository implements ICustomersRepository {

    async findById(id: string): Promise<Customer | any> {

        const query = knex("customers").select();

        const customer = await query.where("id", "=", id).select("*");

        return customer;

    }

    async findCustomerByCpf(cpf: string): Promise<Customer[] | []> {

        const query = knex("customers").select();

        const customer = await query.where("cpf", "=", cpf).select("*");

        return customer;

    }

    async customerRegistration(registration: CustomerStartRegistration): Promise<void> {

        await knex("start-customer-registration").insert(registration);

    }

    async findRegistrationBySessionId(session_id: string | null): Promise<CustomerStartRegistration[] | []> {

        const query = knex("start-customer-registration").select();

        const customerRegistration = await query.where("sessionId", "=", session_id).select("*");

        return customerRegistration;

    }

    async updateCustomerRegistration(registration: CustomerStartRegistration): Promise<void> {

        await knex("start-customer-registration").where("sessionId", "=", registration.sessionId).update(registration);

    }


    async createCustomer(customer: Customer): Promise<number[]> {

        return await knex("customers").insert(customer);

    }
}