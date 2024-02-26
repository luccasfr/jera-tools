'use client'
import ResultDisplay from '@/components/result-display'
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
import { File, Grab, PackageOpen } from 'lucide-react'
import { DragEvent, useCallback, useEffect, useState } from 'react'

type Props = {}

const statusIcons: Record<string, JSX.Element> = {
  over: <PackageOpen />,
  enter: <Grab />,
  leave: <Grab />,
  none: <Grab />,
}

const statusText: Record<string, string> = {
  over: 'yeah drop it!',
  enter: 'drop it!',
  leave: 'drag your files here',
  none: 'drag your files here',
}

type FileBase64 = {
  name: string
  base64: string
}

export default function Base64ConvertPage({}: Props) {
  const [dragStatus, setDragStatus] = useState<
    'over' | 'enter' | 'leave' | 'drop' | 'none'
  >('none')
  const [outputFormat, setOutputFormat] = useState<'data-uri' | 'plain'>(
    'data-uri',
  )
  const [files, setFiles] = useState<FileList | null>(null)
  const [filesBase64, setFilesBase64] = useState<FileBase64[] | null>(null)

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragStatus('over')
    setFiles(null)
  }, [])

  const onDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragStatus('enter')
  }, [])

  const onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragStatus('leave')
  }, [])

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragStatus('drop')
    const files = event.dataTransfer.files
    setFiles(files)
  }, [])

  const handleOutputFormatChange = (value: string) => {
    setOutputFormat(value as 'data-uri' | 'plain')
  }

  useEffect(() => {
    setFilesBase64(null)
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          let base64 = event.target?.result
          if (typeof base64 === 'string') {
            if (outputFormat === 'plain') {
              base64 = base64.split(',')[1]
            }
            setFilesBase64((prev) => [
              ...(prev || []),
              {
                name: file.name,
                base64: base64 as string,
              },
            ])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }, [files, outputFormat])

  return (
    <div className="space-y-4">
      <Title>File to Base64</Title>
      <div
        className="flex min-h-40 w-full items-center justify-center rounded border-[1px] border-border"
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {files ? (
          <div
            className={`${files.length < 5 ? 'flex justify-center' : 'grid grid-cols-5'} gap-4 py-4 text-sm`}
          >
            {Array.from(files).map((file, index) => (
              <div
                className="flex flex-col items-center justify-center gap-1"
                key={index}
              >
                <File />
                <p className="text-xs">{file.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="pointer-events-none flex flex-col items-center justify-center text-sm text-primary/60">
            {statusIcons[dragStatus]}
            <p>{statusText[dragStatus]}</p>
          </div>
        )}
      </div>
      <div className="space-y-2">
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
            {filesBase64.map((file, index) => (
              <ResultDisplay
                content={file.base64}
                key={file.name}
                contentName={file.name + ' base64 content'}
                variant="mono"
                titleInside
                excerpt={file.base64.substring(0, 150) + '...'}
              />
              // <div
              //   key={index}
              //   className="relative flex flex-col gap-2 rounded border-[1px] border-border p-4"
              // >
              //   <p className="absolute -top-4 left-2 rounded bg-background p-1 text-sm font-bold">
              //     {file.name}
              //   </p>
              //   <p className="text-xs">{file.base64}</p>
              // </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
