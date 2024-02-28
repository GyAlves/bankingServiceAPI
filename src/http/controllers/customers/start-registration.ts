
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeStartCustomerRegistrationUseCase } from "../../../use-cases/factories/make-start-customer-registration-use-case";

// error-handling
import { CustomerNotFoundByCpfError } from '../../../use-cases/errors/customer-not-found-by-cpf-error';

export async function startCustomerRegistration(request: FastifyRequest, reply: FastifyReply) {

    try {

        const startCustomerRegistration = makeStartCustomerRegistrationUseCase();

        const registerCustomerCpfSchema = z.object({
            cpf: z.string(),
        });

        const { cpf } = registerCustomerCpfSchema.parse(request.body);

        const { sessionId } = await startCustomerRegistration.execute({ customer_cpf: cpf });

        reply.cookie("sessionId", sessionId);

        return reply.status(200).send(
            {
                message: "Customer registration initialized"
            }
        );

    } catch (err) {

        if (err instanceof CustomerNotFoundByCpfError) {
            return reply.status(404).send({ message: "Customer not found" });
        }

        reply.status(400).send({ message: "Error finding customer", error: err });

    }
}
