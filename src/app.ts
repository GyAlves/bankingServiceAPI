
// dependencies
import fastify from 'fastify';
import cookie from "@fastify/cookie";

// routes 
import { CustomersRouter } from "./http/controllers/customers/routes";

export const app = fastify();

app.register(cookie);
app.register(CustomersRouter, { prefix: "/v1/customer" });