import GenerateDBUrl from '@/components/generate-db-url'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'generate db url'
}

export default function DatabaseURLPage() {
  return (
    <>
      <Title>Generate db URL</Title>
      <Summary>
        Generate a database URL connection string for your application.
      </Summary>

      <GenerateDBUrl />
    </>
  )
}
