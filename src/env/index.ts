// dependencies
import "dotenv/config";
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.number().default(3000),
    ENVIRONMENT: z.enum(["development", "production", "test"]).default("production"),
    DATABASE_URL: z.string(),
});

const envValidation = envSchema.safeParse(process.env);

if (envValidation.success === false) {
    console.error("Invalid environment variables", envValidation.error.format());

    throw new Error("Invalid environment variables")
}

export const env = envValidation.data;