
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';

// use-cases
import { makeCreateCustomerUseCase } from "../../../use-cases/factories/make-create-customer-use-case";

// error-handling
import { CustomerRegistrationNotFoundError } from '../../../use-cases/errors/customer-registration-session-not-found-error';
import { InvalidCustomerRegistrationStepError } from '../../../use-cases/errors/wrong-customer-registration-step-error';
import { CustomerRegistrationFailedError } from '../../../use-cases/errors/customer-registration-failed-error';
import { CustomerAlreadyExistsError } from '../../../use-cases/errors/customer-already-exists-error';

export async function customer(request: FastifyRequest, reply: FastifyReply) {

    try {

        const createCustomer = makeCreateCustomerUseCase();

        const session_id = request.cookies.sessionId || "";

        const { customer } = await createCustomer.execute({ session_id });

        return reply.status(200).send({ message: "Customer created successfully", customer });

    } catch (err) {

        if (err instanceof CustomerRegistrationNotFoundError) {
            return reply.status(404).send({ message: "Customer registration process not found" });
        }

        if (err instanceof CustomerAlreadyExistsError) {
            return reply.status(400).send({ message: "Customer already exists" });
        }

        if (err instanceof InvalidCustomerRegistrationStepError) {
            return reply.status(400).send(
                {
                    message: "Wrong customer registration step"
                });
        }

        if (err instanceof CustomerRegistrationFailedError) {
            return reply.status(400).send({ message: "Customer is not available to be created. Redo registration process" });
        }


        reply.status(400).send({ message: "Error creating customer", error: err });
    }
}
