import Summary from '@/components/summary'
import TextToBase64 from '@/components/text-to-base64'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'text to base64'
}

export default function TextToBase64Page() {
  return (
    <>
      <Title>Text to Base64</Title>
      <Summary>convert your text to Base64.</Summary>

      <TextToBase64 />
    </>
  )
}
