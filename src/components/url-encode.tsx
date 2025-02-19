'use client'
import ResultDisplay from '@/components/result-display'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import urlEncode from '@/services/url-encode'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const urlEncodeSchema = z.object({
  content: z
    .string({
      required_error: 'content is required'
    })
    .min(1, 'content is required')
})

export type URLEncodeType = z.infer<typeof urlEncodeSchema>

export default function URLEncode() {
  const [result, setResult] = useState<string | null>(null)
  const form = useForm<URLEncodeType>({
    resolver: zodResolver(urlEncodeSchema)
  })

  const onSubmit = async (data: URLEncodeType) => {
    const encoded = await urlEncode(data.content)
    setResult(encoded)
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>content</FormLabel>
                <Input placeholder="type your content" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">encode</Button>
        </form>
      </Form>
      {result && (
        <ResultDisplay contentName="encoded content" content={result} />
      )}
    </>
  )
}
