import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`)
}

export const env = parsedEnv.data
