
// dependencies
import knex from '../../database/database.config';

// models 
import { Customer } from "../../models/Customer";
import { CustomerRegistration } from "../../models/CustomerStartRegistration";

// repositories
import { ICustomersRepository } from '../customers-repository-interface'

export class KnexCustomersRepository implements ICustomersRepository {

    async findById(id: string): Promise<Customer[] | []> {

        const query = knex("customers").select();

        const customer = await query.where("id", "=", id).select("*");

        return customer;

    }

    async findCustomerByCpf(cpf: string): Promise<Customer[] | []> {

        const query = knex("customers").select();

        const customer = await query.where("cpf", "=", cpf).select("*");

        return customer;

    }

    async customerStartRegistration(registration: CustomerRegistration): Promise<number[]> {

        const customerRegistration = await knex("start-customer-registration").insert(registration);
        return customerRegistration;
    }

    async findRegistrationBySessionId(session_id: string | null): Promise<CustomerRegistration[] | []> {

        const query = knex("start-customer-registration").select();

        const customerRegistration = await query.where("sessionId", "=", session_id).select("*");

        return customerRegistration;

    }

    async updateCustomerRegistration(registration: CustomerRegistration): Promise<void> {

        const sessionId = registration.sessionId || "";

        await knex("start-customer-registration").where("sessionId", "=", sessionId).update(registration);

    }

    async createCustomer(customer: Customer): Promise<number[]> {

        return await knex("customers").insert(customer);

    }
}