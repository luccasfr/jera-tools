'use client'
import ResultDisplay from '@/components/result-display'
import Summary from '@/components/summary'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import generateGuid from '@/services/generate-guid'
import generate from '@/services/generate-hash'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dices } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const generateHashSchema = z.object({
  hash: z.enum(['sha1', 'sha256', 'sha512'], {
    required_error: 'you must select a hash',
  }),
  seed: z
    .string({
      required_error: 'you must type a seed',
    })
    .min(5, {
      message: 'seed must be at least 5 character long',
    }),
})

export type GenerateHashType = z.infer<typeof generateHashSchema>

export default function GenerateHashPage() {
  const [hash, setHash] = useState<string>('')
  const form = useForm<GenerateHashType>({
    resolver: zodResolver(generateHashSchema),
  })

  const onSubmit = async (data: GenerateHashType) => {
    const hash = await generate(data.hash, data.seed)
    setHash(hash)
  }

  const handleRandomSeed = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const guid = await generateGuid()
    const sha1 = await generate('sha256', `${guid}${new Date().getTime()}`)
    form.setValue('seed', sha1)
  }

  return (
    <div className="space-y-4">
      <Title>generate hash</Title>
      <Summary>
        Generate a hash from a seed using the selected algorithm.
      </Summary>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="hash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>hash</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a hash" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sha1">SHA1</SelectItem>
                    <SelectItem value="sha256">SHA256</SelectItem>
                    <SelectItem value="sha512">SHA512</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="w-full">seed</FormLabel>
                <Button
                  variant="outline"
                  className="absolute right-2 top-8 h-6 w-6"
                  size="icon"
                  onClick={handleRandomSeed}
                >
                  <Dices size={14} />
                </Button>
                <Input placeholder="type your seed" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">generate</Button>
        </form>
      </Form>

      {hash && (
        <ResultDisplay contentName="hash" variant="mono" content={hash} />
      )}
    </div>
  )
}
