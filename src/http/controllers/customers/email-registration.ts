
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeCustomerEmailRegistrationUseCase } from "../../../use-cases/factories/make-customer-email-registration-use-case";

// error-handling
import { CustomerRegistrationNotFoundError } from '../../../use-cases/errors/customer-registration-session-not-found-error';
import { InvalidCustomerRegistrationStepError } from '../../../use-cases/errors/wrong-customer-registration-step-error';
import { InvalidEmailError } from '../../../use-cases/errors/invalid-email-error';

export async function emailRegistration(request: FastifyRequest, reply: FastifyReply) {

    try {

        const customerEmailRegistration = makeCustomerEmailRegistrationUseCase();

        const registerCustomerEmailSchema = z.object({
            email: z.string()
        });

        const session_id = request.cookies.sessionId || "";

        const { email } = registerCustomerEmailSchema.parse(request.body);

        await customerEmailRegistration.execute({ email, session_id });

        return reply.status(200).send(
            {
                message: "Customer email registration completed successfully",
                session_id
            }
        );

    } catch (err) {

        if (err instanceof CustomerRegistrationNotFoundError) {
            return reply
                .status(404)
                .send({ message: "Registration not found. Start customer registration process" });
        }

        if (err instanceof InvalidEmailError) {
            return reply
                .status(400)
                .send({ message: "Invalid email" });
        }

        if (err instanceof InvalidCustomerRegistrationStepError) {
            return reply
                .status(400)
                .send({ message: "Wrong registration step" });
        }

        reply.status(400).send({ message: "Error registering customer email", error: err });

    }
}
