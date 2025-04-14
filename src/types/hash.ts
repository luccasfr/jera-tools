import { z } from 'zod'

export const hashEnum = ['md5', 'sha1', 'sha256', 'sha512'] as const

export const generateHashSchema = z.object({
  hash: z.enum(hashEnum, {
    required_error: 'you must select a hash',
    invalid_type_error: 'you must select a hash'
  }),
  seed: z
    .string({
      required_error: 'you must type a seed'
    })
    .min(5, {
      message: 'seed must be at least 5 character long'
    })
})

export type GenerateHashType = z.infer<typeof generateHashSchema>
