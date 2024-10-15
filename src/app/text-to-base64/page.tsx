'use client'

import ResultDisplay from '@/components/result-display'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { textToBase64Schema, TextToBase64Type } from '@/types/text-to-base64'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function TextToBase64Page() {
  const [base64, setBase64] = useState<string | null>(null)
  const form = useForm<TextToBase64Type>({
    resolver: zodResolver(textToBase64Schema),
  })

  function onSubmit(data: TextToBase64Type) {
    const base64 = Buffer.from(data.text).toString('base64')
    setBase64(base64)
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>text</FormLabel>
                <FormControl>
                  <Input placeholder="text to be converted" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">convert</Button>
        </form>
      </Form>
      {base64 && (
        <ResultDisplay
          content={base64}
          contentName="result"
          variant="mono"
          titleInside
        />
      )}
    </div>
  )
}
