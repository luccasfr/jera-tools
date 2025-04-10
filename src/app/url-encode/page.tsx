import Summary from '@/components/summary'
import Title from '@/components/title'
import { Separator } from '@/components/ui/separator'
import URLEncodeDecode from '@/components/url'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'url encode'
}

export default function URLEncodePage() {
  return (
    <>
      <Title>URL Encode</Title>
      <Summary>Encode a string to be used in a URL.</Summary>
      <URLEncodeDecode type="encode" />
      <Separator />
      <Title>URL Decode</Title>
      <Summary>Decode a URL-encoded string back to its original form.</Summary>
      <URLEncodeDecode type="decode" />
    </>
  )
}
