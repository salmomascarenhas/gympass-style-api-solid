import { config } from 'dotenv'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('❌ Invalid enviroment variables', _env.error.format())
    throw new Error('Invalid environment variable')
}

export const env = _env.data