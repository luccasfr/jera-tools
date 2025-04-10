import Base64ToText from '@/components/base64-to-text'
import Summary from '@/components/summary'
import TextToBase64 from '@/components/text-to-base64'
import Title from '@/components/title'
import { Separator } from '@/components/ui/separator'
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
      <Separator />

      <Title>Base64 to Text</Title>
      <Summary>convert your Base64 to text.</Summary>
      <Base64ToText />
    </>
  )
}
