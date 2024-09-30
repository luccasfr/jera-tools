'use client'
import ResultDisplay from '@/components/result-display'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import UploadFile from '@/components/upload-file'
import { useRef, useState } from 'react'

type FileBase64 = {
  name: string
  base64: string
}

export default function Base64ConvertPage() {
  const [outputFormat, setOutputFormat] = useState<'data-uri' | 'plain'>(
    'data-uri',
  )
  const [filesBase64, setFilesBase64] = useState<FileBase64[] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOutputFormatChange = (value: string) => {
    setOutputFormat(value as 'data-uri' | 'plain')
  }

  return (
    <div className="space-y-4">
      <input type="file" className="hidden" ref={fileInputRef} multiple />
      <Title>File to b64</Title>
      <div className="space-y-2">
        <Summary>
          Convert your files to base64. Drag and drop your files in the box
          below.
        </Summary>
      </div>
      <div className="space-y-2">
        <UploadFile
          className="mb-2"
          multiple
          outputFormat={outputFormat}
          onFilesChange={(f) => {
            setFilesBase64(f)
          }}
        />
        <Label>output format</Label>
        <Select
          defaultValue="data-uri"
          name="output-format"
          onValueChange={handleOutputFormatChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="data-uri">Data URI</SelectItem>
              <SelectItem value="plain">Plain text</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {filesBase64 && (
        <>
          <Title variant="sub-title">results</Title>
          <div className="space-y-8 break-words">
            {filesBase64.map((file) => (
              <ResultDisplay
                content={file.base64}
                key={file.name}
                contentName={file.name}
                variant="mono"
                titleInside
                excerpt={file.base64.slice(0, 150) + '...'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
