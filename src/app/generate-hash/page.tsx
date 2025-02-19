import GenerateHash from '@/components/generate-hash'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'generate-hash'
}

export default function GenerateHashPage() {
  return (
    <>
      <Title>generate hash</Title>
      <Summary>
        Generate a hash from a seed using the selected algorithm.
      </Summary>

      <GenerateHash />
    </>
  )
}
