'use client'

import { compareBcryptHash } from '@/actions/bcrypt'
import Title from '@/components/title'
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
import { cn } from '@/lib/utils'
import { bcryptCompareSchema, type BcryptCompareType } from '@/types/bcrypt'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function BCryptCompare() {
  const [result, setResult] = useState<boolean | null>(null)
  const form = useForm<BcryptCompareType>({
    resolver: zodResolver(bcryptCompareSchema),
  })

  const onSubmit = async (data: BcryptCompareType) => {
    const response = await compareBcryptHash(data)
    setResult(response)
  }

  return (
    <div className="space-y-4">
      <Title>Compare Bcrypt Hash</Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="hash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bcrypt hash</FormLabel>
                <FormControl>
                  <Input
                    placeholder="the bcrypt hash to be compared"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>text</FormLabel>
                <FormControl>
                  <Input placeholder="the text to be compared" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">compare</Button>
        </form>
      </Form>
      {result !== null && (
        <div
          className={cn(
            'flex items-center gap-1 text-lg font-medium',
            result ? 'text-green-500' : 'text-destructive',
          )}
        >
          {result ? (
            <>
              <Check size={24} />
              <p>match</p>
            </>
          ) : (
            <>
              <X size={24} />
              <p>does not match</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
