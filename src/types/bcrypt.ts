import { z } from 'zod'

export const bcryptGenerateSchema = z.object({
  text: z.string({
    message: 'text is required',
  }),
  saltRounds: z.number().optional(),
})
export type BcryptGenerateType = z.infer<typeof bcryptGenerateSchema>

export const bcryptCompareSchema = z.object({
  text: z
    .string({
      required_error: 'text is required',
    })
    .min(1, 'text is required'),
  hash: z
    .string({
      required_error: 'hash is required',
    })
    .min(1, 'hash is required'),
})
export type BcryptCompareType = z.infer<typeof bcryptCompareSchema>
