'use client'

import { generateBcryptHash } from '@/actions/bcrypt'
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
import { bcryptGenerateSchema, type BcryptGenerateType } from '@/types/bcrypt'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Title from '@/components/title'

export default function BCryptGenerate() {
  const [hash, setHash] = useState<string | null>(null)
  const form = useForm<BcryptGenerateType>({
    defaultValues: {
      saltRounds: 10
    },
    resolver: zodResolver(bcryptGenerateSchema)
  })

  const onSubmit = async (data: BcryptGenerateType) => {
    const response = await generateBcryptHash(data)
    setHash(response)
  }

  return (
    <>
      <Title>Generate Bcrypt Hash</Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>text</FormLabel>
                <FormControl>
                  <Input placeholder="text to be hashed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="saltRounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>salt rounds</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="salt rounds"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">hash</Button>
        </form>
      </Form>
      {hash && (
        <ResultDisplay
          content={hash}
          contentName="hash"
          variant="mono"
          titleInside
        />
      )}
    </>
  )
}
