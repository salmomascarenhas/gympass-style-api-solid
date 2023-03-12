import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_URL === 'sqlite' ? {
        filename: env.DATABASE_URL
    } : env.PG_CONNECTION_STRING,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}
export const knex = setupKnex(config)
