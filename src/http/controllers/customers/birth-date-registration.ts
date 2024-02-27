
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeCustomerRegistrationBirthdateUseCase } from "../../../use-cases/factories/make-customer-registration-birth-date-use-case";

// error-handling
import { CustomerRegistrationNotFoundError } from '../../../use-cases/errors/customer-registration-session-not-found-error';
import { InvalidCustomerRegistrationStepError } from '../../../use-cases/errors/wrong-customer-registration-step-error';
import { CustomerIsUnderAgeError } from '../../../use-cases/errors/customer-is-under-age-error';

export async function birthDateRegistration(request: FastifyRequest, reply: FastifyReply) {

    try {

        const customerBirthdateRegistration = makeCustomerRegistrationBirthdateUseCase();

        const registerCustomerBirthdateSchema = z.object({
            birth_date: z.string()
        });

        const session_id = request.cookies.sessionId || "";

        const { birth_date } = registerCustomerBirthdateSchema.parse(request.body);

        await customerBirthdateRegistration.execute({ birth_date, session_id });

        return reply.status(200).send(
            {
                message: "Customer birth date registration completed successfully",
                session_id
            }
        );

    } catch (err) {

        if (err instanceof CustomerRegistrationNotFoundError) {
            return reply
                .status(404)
                .send({ message: "Registration not found. Start customer registration process" });
        }

        if (err instanceof CustomerIsUnderAgeError) {
            return reply
                .status(400)
                .send({ message: "Customer is under age" });
        }

        if (err instanceof InvalidCustomerRegistrationStepError) {
            return reply
                .status(400)
                .send({ message: "Wrong registration step" });
        }

        reply.status(400).send({ message: "Error registering customer", error: err });

    }
}
