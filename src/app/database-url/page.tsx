'use client'
import Title from '@/components/title'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DatabaseURLType, databaseURLSchema } from '@/types/database-url'
import { databaseURL } from '@/services/database-url'
import { useState } from 'react'
import ResultDisplay from '@/components/result-display'

type Props = {}

export default function DatabaseURLPage({}: Props) {
  const [url, setUrl] = useState<string>('')
  const form = useForm<DatabaseURLType>({
    resolver: zodResolver(databaseURLSchema),
  })

  const onSubmit = async (data: DatabaseURLType) => {
    const url = await databaseURL(data)
    setUrl(url)
  }

  return (
    <div className="space-y-4">
      <Title>Database URL Generate</Title>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="dialect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>dialect</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a dialect" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {databaseURLSchema.shape.dialect._def.values.map(
                      (value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>host</FormLabel>
                <Input placeholder="hostname from your db" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>port</FormLabel>
                <Input placeholder="port from your db" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <Input placeholder="username from your db" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <Input placeholder="password from your db" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="database"
            render={({ field }) => (
              <FormItem>
                <FormLabel>database</FormLabel>
                <Input placeholder="database from your db" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">generate</Button>
        </form>
      </Form>
      {url && <ResultDisplay content={url} contentName="url" />}
    </div>
  )
}