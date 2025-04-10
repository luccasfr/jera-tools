import { z } from 'zod'

export const base64ToTextSchema = z.object({
  base64: z.string({
    required_error: 'you must type some text'
  })
})
export type Base64ToTextType = z.infer<typeof base64ToTextSchema>
