
// dependencies
import fastify from 'fastify';

// routes 
import { CustomersRouter } from "./http/controllers/customers/routes";

export const app = fastify();

app.register(CustomersRouter, { prefix: "/v1" });