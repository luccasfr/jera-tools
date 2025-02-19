import FileToBase64 from '@/components/file-to-base64'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'file to base64'
}

export default function FileToBase64Page() {
  return (
    <>
      <Title>File to b64</Title>
      <Summary>
        Convert your files to base64. Drag and drop your files in the box below.
      </Summary>

      <FileToBase64 />
    </>
  )
}
