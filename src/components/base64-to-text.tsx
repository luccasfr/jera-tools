'use client'

import ResultDisplay from '@/components/result-display'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { base64ToTextSchema, Base64ToTextType } from '@/types/base64-to-text'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Base64ToText() {
  const [text, setText] = useState<string | null>(null)
  const form = useForm<Base64ToTextType>({
    resolver: zodResolver(base64ToTextSchema)
  })

  function onSubmit(data: Base64ToTextType) {
    const text = Buffer.from(data.base64, 'base64').toString('utf-8')
    setText(text)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="base64"
            render={({ field }) => (
              <FormItem>
                <FormLabel>text</FormLabel>
                <FormControl>
                  <Input placeholder="base64 text to be converted" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">convert</Button>
        </form>
      </Form>
      {text && (
        <ResultDisplay
          content={text}
          contentName="result"
          variant="mono"
          titleInside
        />
      )}
    </>
  )
}
