
// dependencies
import { FastifyInstance } from "fastify";

//controllers
import { customer } from "./customer";

export async function CustomersRouter(app: FastifyInstance) {
    app.get("/me", customer);
}