
// dependencies
import { FastifyInstance } from "fastify";

//controllers
import { profile } from "./profile";
import { startRegistration } from "./start-registration";
import { nameRegistration } from "./name-registration";


export async function CustomersRouter(app: FastifyInstance) {
    app.get("/profile", profile);
    app.post("/start_registration", startRegistration);
    app.patch("/name_registration", nameRegistration);
}