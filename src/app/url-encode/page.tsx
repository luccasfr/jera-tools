import Summary from '@/components/summary'
import Title from '@/components/title'
import URLEncode from '@/components/url-encode'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'url encode'
}

export default function URLEncodePage() {
  return (
    <>
      <Title>URL Encode</Title>
      <Summary>Encode a string to be used in a URL.</Summary>

      <URLEncode />
    </>
  )
}
