import { z } from 'zod'

export const urlEncodeDecodeSchema = z.object({
  content: z
    .string({
      required_error: 'content is required'
    })
    .min(1, 'content is required')
})

export type URLEncodeDecodeType = z.infer<typeof urlEncodeDecodeSchema>
