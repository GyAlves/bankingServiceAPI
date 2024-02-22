
// dependencies
import knexSetup, { Knex } from "knex";
import { Model } from 'objection'
import { env } from "../env";

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: './src/database/migrations',
    }
}

const knex = knexSetup(config);
Model.knex(knex);

export default knex;
