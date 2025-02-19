'use client'
import { cn } from '@/lib/utils'
import { File, Grab, PackageOpen, Pointer } from 'lucide-react'
import Image from 'next/image'
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const statusIcons: Record<string, JSX.Element> = {
  over: <PackageOpen />,
  enter: <Grab />,
  leave: <Grab />,
  none: <Grab />,
  mouseEnter: <Pointer />
}

const statusText: Record<string, string> = {
  over: 'yeah drop it!',
  enter: 'drop it!',
  leave: 'drag your files here',
  none: 'drag your files here',
  mouseEnter: 'click to select files'
}

export type FileBase64 = {
  name: string
  base64: string
}

type UploadFileProps = {
  multiple?: boolean
  fileType?: 'image' | 'pdf' | 'audio' | 'video' | 'text' | 'other'
  title?: string
  onFilesChange?: (files: FileBase64[]) => void
  errorMessage?: string | undefined
  imagePreview?: boolean
  fileList?: FileList | null
  outputFormat?: 'data-uri' | 'plain'
} & Omit<
  JSX.IntrinsicElements['div'],
  'onDrop' | 'onDragOver' | 'onDragEnter' | 'onDragLeave'
>

export default function UploadFile({
  multiple,
  fileType = 'other',
  title = '',
  onFilesChange,
  errorMessage,
  imagePreview = true,
  fileList,
  className,
  outputFormat,
  ...props
}: UploadFileProps) {
  const [dragStatus, setDragStatus] = useState<
    'over' | 'enter' | 'leave' | 'drop' | 'mouseEnter' | 'none'
  >('none')
  const [files, setFiles] = useState<FileList | null>(null)
  const [filesBase64, setFilesBase64] = useState<FileBase64[] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const filesBase64Ref = useRef<FileBase64[] | null>(null)
  const onFilesChangeRef = useRef(onFilesChange)
  const outputFormatRef = useRef(outputFormat)

  useEffect(() => {
    if (fileList) {
      setFiles((prev) => {
        if (prev) return prev
        return fileList
      })
    }
  }, [fileList])

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

  const checkFileType = useCallback(
    (file: File) => {
      const type = file.type.split('/')[0]
      switch (fileType) {
        case 'image': {
          return type === 'image'
        }
        case 'pdf': {
          return file.type === 'application/pdf'
        }
        case 'audio': {
          return type === 'audio'
        }
        case 'video': {
          return type === 'video'
        }
        case 'text': {
          return type === 'text'
        }
        case 'other': {
          return true
        }
      }
    },
    [fileType]
  )

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragStatus('drop')
      const files = event.dataTransfer.files
      if (!multiple && files.length > 1) {
        toast.error('only one file allowed!')
        return
      }
      const invalidFiles = [...files].filter((file) => !checkFileType(file))
      if (invalidFiles.length > 0) {
        toast.error('invalid file type!')
        return
      }
      setFiles(files)
    },
    [multiple, checkFileType]
  )

  const onMouseEnter = useCallback(() => {
    if (files) return
    setDragStatus('mouseEnter')
  }, [files])

  const onMouseLeave = useCallback(() => {
    if (files) return
    setDragStatus('none')
  }, [files])

  const handleFileSelect = () => {
    const input = fileInputRef.current
    if (!input) return
    input.click()
    input.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files
      setFiles(files)
    })
  }

  useEffect(() => {
    onFilesChangeRef.current = onFilesChange
  }, [onFilesChange])

  useEffect(() => {
    outputFormatRef.current = outputFormat
  }, [outputFormat])

  useEffect(() => {
    setFilesBase64(null)
    if (files) {
      let fileList = [...files]
      for (const file of fileList) {
        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
          let base64 = event.target?.result
          if (
            outputFormatRef.current === 'plain' &&
            typeof base64 === 'string'
          ) {
            base64 = base64.split(',')[1]
          }
          if (typeof base64 === 'string') {
            setFilesBase64((prev) => [
              ...(prev || []),
              {
                name: file.name,
                base64: base64 as string
              }
            ])
          }
        })
        reader.readAsDataURL(file)
      }
    }
  }, [files])

  const getFileType = useCallback(() => {
    switch (fileType) {
      case 'image': {
        return 'image/*'
      }
      case 'pdf': {
        return 'application/pdf'
      }
      case 'audio': {
        return 'audio/*'
      }
      case 'video': {
        return 'video/*'
      }
      case 'text': {
        return 'text/*'
      }
      case 'other': {
        return '*'
      }
    }
  }, [fileType])

  useEffect(() => {
    if (filesBase64) {
      filesBase64Ref.current = filesBase64
      onFilesChangeRef.current?.(filesBase64)
    }
  }, [filesBase64])

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        multiple={multiple}
        accept={fileType === 'other' ? undefined : `${getFileType()}`}
      />
      {title && (
        <p
          className={`text-sm font-semibold ${errorMessage && 'text-destructive'}`}
        >
          {title}
        </p>
      )}
      <div className="space-y-2">
        <div
          className={`flex min-h-40 w-full cursor-pointer items-center justify-center rounded
            border-[1px] ${errorMessage ? 'border-destructive' : 'border-border'}`}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleFileSelect}
        >
          {files ? (
            <div
              className={`${files.length < 5 ? 'flex justify-center' : 'grid grid-cols-5'} gap-4 py-4
                text-sm`}
            >
              {[...files].map((file, index) => (
                <div
                  className="flex flex-col items-center justify-center gap-1"
                  key={index}
                >
                  {file.type.split('/')[0] === 'image' && imagePreview ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={300}
                      height={300}
                      className="aspect-square object-contain"
                    />
                  ) : (
                    <File />
                  )}
                  <p className="text-xs">{file.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`pointer-events-none flex flex-col items-center justify-center px-4 text-sm
                text-primary/60`}
            >
              {statusIcons[dragStatus]}
              <p>{statusText[dragStatus]}</p>
            </div>
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="text-sm font-semibold text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}
