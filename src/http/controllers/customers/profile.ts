
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeGetCustomerProfileUseCase } from "../../../use-cases/factories/make-get-customer-profile-use-case";

// error-handling
import { CustomerNotFoundByCpfError } from '../../../use-cases/errors/customer-not-found-by-cpf-error';

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    try {

        const getCustomerProfile = makeGetCustomerProfileUseCase();

        const registerCustomerCpfSchema = z.object({
            cpf: z.string(),
        });

        const { cpf } = registerCustomerCpfSchema.parse(request.body);

        const { customer } = await getCustomerProfile.execute({ customer_cpf: cpf });

        return reply.status(200).send({ message: "Customer found", customer });

    } catch (err) {

        if (err instanceof CustomerNotFoundByCpfError) {
            return reply.status(404).send({ message: "Customer not found" });
        }

        reply.status(400).send({ message: "Error finding customer", error: err });
    }
}
