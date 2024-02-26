import { z } from 'zod'

export const databaseURLSchema = z.object({
  dialect: z.enum(['mysql', 'postgres', 'sql-server'], {
    required_error: 'you must select a dialect',
  }),
  host: z.string({
    required_error: 'you must type a host',
  }),
  port: z.string({
    required_error: 'you must type a port',
  }),
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
