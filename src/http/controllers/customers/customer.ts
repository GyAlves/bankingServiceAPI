
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';

// use-cases
import { makeGetCustomerProfileUseCase } from "../../../use-cases/factories/make-get-customer-profile-use-case";

export async function customer(request: FastifyRequest, reply: FastifyReply) {

    const getCustomerProfile = makeGetCustomerProfileUseCase()

    const { customer } = await getCustomerProfile.execute({ customer_id: "123" })

    return reply.status(200).send({ message: "Customer found", customer })
}
