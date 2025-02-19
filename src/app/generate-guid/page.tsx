import GenerateGuid from '@/components/generate-guid'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'generate guid'
}

export default function GenerateGuidPage() {
  return (
    <>
      <Title>generate guid</Title>
      <Summary>Generate a globally unique identifier (GUID).</Summary>

      <GenerateGuid />
    </>
  )
}
