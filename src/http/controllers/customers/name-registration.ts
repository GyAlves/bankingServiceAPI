
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeCustomerRegistrationNameUseCase } from "../../../use-cases/factories/make-customer-registration-name-use-case";

export async function nameRegistration(request: FastifyRequest, reply: FastifyReply) {

    try {

        const customerNameRegistration = makeCustomerRegistrationNameUseCase();

        const registerCustomerNameSchema = z.object({
            first_name: z.string(),
            last_name: z.string(),
        });

        const session_id = request.cookies.sessionId || "";

        const { first_name, last_name } = registerCustomerNameSchema.parse(request.body);

        await customerNameRegistration.execute({ first_name, last_name, session_id });

        return reply.status(200).send(
            {
                message: "Customer name registration completed successfully",
                session_id
            }
        );

    } catch (err) {

        console.log(err);

    }
}
