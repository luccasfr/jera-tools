'use client'
import ResultDisplay from '@/components/result-display'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { urlDecode, urlEncode } from '@/lib/url'
import { urlEncodeDecodeSchema, URLEncodeDecodeType } from '@/types/url'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type URLEncodeDecodeProps = {
  type: 'encode' | 'decode'
}

export default function URLEncodeDecode({ type }: URLEncodeDecodeProps) {
  const [result, setResult] = useState<string | null>(null)
  const form = useForm<URLEncodeDecodeType>({
    resolver: zodResolver(urlEncodeDecodeSchema)
  })

  const onSubmit = async (data: URLEncodeDecodeType) => {
    if (type === 'encode') {
      const result = urlEncode(data.content)
      setResult(result)
      return
    }
    const result = urlDecode(data.content)
    setResult(result)
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
          <Button type="submit">
            {type === 'encode' ? 'encode' : 'decode'}
          </Button>
        </form>
      </Form>
      {result && (
        <ResultDisplay
          contentName={`${type === 'encode' ? 'encoded' : 'decoded'} content`}
          content={result}
        />
      )}
    </>
  )
}
