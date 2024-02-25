
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeStartCustomerRegistrationUseCase } from "../../../use-cases/factories/make-start-customer-registation-use-case";

export async function startRegistration(request: FastifyRequest, reply: FastifyReply) {

    try {

        const startCustomerRegistration = makeStartCustomerRegistrationUseCase();

        const registerCustomerCpfSchema = z.object({
            cpf: z.string(),
        });

        const { cpf } = registerCustomerCpfSchema.parse(request.body);

        const sessionId = await startCustomerRegistration.execute({ customer_cpf: cpf });

        reply.cookie("sessionId", sessionId);

        return reply.status(200).send(
            {
                message: "Customer registration initialized",
                cookies: request.cookies.sessionId
            }
        );

    } catch (err) {

        console.log(err);

    }
}
