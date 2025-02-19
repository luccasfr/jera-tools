import { z } from 'zod'

export const databaseURLSchema = z.object({
  dialect: z.enum(['mysql', 'postgres', 'sql-server'], {
    required_error: 'you must select a dialect'
  }),
  host: z
    .string({
      required_error: 'you must type a host'
    })
    .min(3, 'host must be at least 3 characters'),
  port: z
    .string({
      required_error: 'you must type a port'
    })
    .min(1, 'port must be at least 1 character')
    .refine((value) => {
      const port = Number.parseInt(value, 10)
      return port >= 0 && port <= 65_535
    }, 'port must be a number between 0 and 65535'),
  username: z
    .string({
      required_error: 'you must type a username'
    })
    .min(3, 'username must be at least 3 characters'),
  password: z
    .string({
      required_error: 'you must type a password'
    })
    .min(3, 'password must be at least 3 characters'),
  database: z
    .string({
      required_error: 'you must type a database'
    })
    .min(3, 'database must be at least 3 characters')
})

export type DatabaseURLType = z.infer<typeof databaseURLSchema>
