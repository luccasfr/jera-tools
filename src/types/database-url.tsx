import { z } from 'zod'

export const databaseURLSchema = z.object({
  dialect: z.enum(['mysql', 'postgres', 'sql-server'], {
    required_error: 'you must select a dialect',
  }),
  host: z
    .string({
      required_error: 'you must type a host',
    })
    .ip({
      message: 'host must be a valid IP address',
    }),
  port: z
    .string({
      required_error: 'you must type a port',
    })
    .refine((value) => {
      const port = parseInt(value, 10)
      return port >= 0 && port <= 65535
    }, 'port must be a number between 0 and 65535'),
  username: z.string({
    required_error: 'you must type a username',
  }),
  password: z.string({
    required_error: 'you must type a password',
  }),
  database: z.string({
    required_error: 'you must type a database',
  }),
})

export type DatabaseURLType = z.infer<typeof databaseURLSchema>
