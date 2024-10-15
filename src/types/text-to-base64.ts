import { z } from 'zod'

export const textToBase64Schema = z.object({
  text: z.string({
    required_error: 'you must type some text',
  }),
})
export type TextToBase64Type = z.infer<typeof textToBase64Schema>
