
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeCustomerRegistrationNameUseCase } from "../../../use-cases/factories/make-customer-registration-name-use-case";

// error-handling
import { CustomerRegistrationNotFoundError } from '../../../use-cases/errors/customer-registration-session-not-found-error';
import { InvalidNameError } from '../../../use-cases/errors/invalid-name-error';
import { InvalidCustomerRegistrationStepError } from '../../../use-cases/errors/wrong-customer-registration-step-error';

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

        if (err instanceof CustomerRegistrationNotFoundError) {
            return reply
                .status(404)
                .send({ message: "Registration not found. Start customer registration process" });
        }

        if (err instanceof InvalidNameError) {
            return reply
                .status(400)
                .send({ message: "First name and/or last name are too short. " });
        }

        if (err instanceof InvalidCustomerRegistrationStepError) {
            return reply
                .status(400)
                .send({ message: "Wrong registration step" });
        }
        console.log(err);

        reply.status(400).send({ message: "Error registering customer name", error: err });

    }
}
