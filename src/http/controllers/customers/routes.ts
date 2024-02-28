
// dependencies
import { FastifyInstance } from "fastify";

//controllers
import { profile } from "./profile";
import { startCustomerRegistration } from "./start-registration";
import { nameRegistration } from "./name-registration";
import { birthDateRegistration } from "./birth-date-registration";
import { emailRegistration } from "./email-registration";
import { customer } from "./create-customer";


export async function CustomersRouter(app: FastifyInstance) {
    app.get("/profile", profile);
    app.post("/registration", startCustomerRegistration);
    app.patch("/name_registration", nameRegistration);
    app.patch("/birth_date_registration", birthDateRegistration);
    app.patch("/email_registration", emailRegistration);
    app.post("/create", customer);
}