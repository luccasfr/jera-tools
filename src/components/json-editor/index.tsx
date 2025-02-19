'use client'

import JSONEditorToolbar from '@/components/json-editor/toolbar'
import Title from '@/components/title'
import { type JSONParseError } from '@/types/json-editor'
import type { Editor } from 'ace-builds'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import JSONEditorSummary from './summary'
import { Skeleton } from '@/components/ui/skeleton'
import { LoaderCircle } from 'lucide-react'

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace')
    await Promise.all([
      import('ace-builds/src-noconflict/ext-searchbox'),
      import('ace-builds/src-noconflict/mode-json'),
      import('ace-builds/src-noconflict/theme-chrome'),
      import('ace-builds/src-noconflict/theme-twilight')
    ])
    return ace
  },
  {
    ssr: false,
    loading: () => (
      <Skeleton className="flex flex-1 flex-col items-center justify-center gap-2">
        <LoaderCircle className="size-8 animate-spin" />
        <p>loading editor</p>
      </Skeleton>
    )
  }
)

export default function JsonEditor() {
  const [value, setValue] = useState('')
  const { theme, systemTheme } = useTheme()
  const [jsonName, setJsonName] = useState('file.json')
  const [error, setError] = useState<JSONParseError | null>(null)
  const editorRef = useRef<Editor | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const beautify = useCallback(() => {
    try {
      const parsed = JSON.parse(value)
      setValue(JSON.stringify(parsed, null, 2))
      toast.success('json beautified')
    } catch (error) {
      console.error(error)
    }
  }, [value])

  const saveToFile = useCallback(() => {
    const blob = new Blob([value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a') as HTMLAnchorElement
    a.href = url
    a.download = jsonName
    a.click()
    toast.info('download started')
    URL.revokeObjectURL(url)
  }, [value, jsonName])

  const openFile = useCallback(() => {
    const input = inputRef.current
    if (!input) return
    input.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const text = await file.text()
      setJsonName(file.name)
      setValue(text)
      toast.success('file loaded')
    })
    input.click()
    input.value = ''
  }, [])

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'F') {
        beautify()
      }
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyF') {
        e?.preventDefault()
        if (editorRef.current) editorRef.current.execCommand('find')
      }
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
        e?.preventDefault()
        saveToFile()
      }
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyO') {
        e?.preventDefault()
        openFile()
      }
      if (e.code === 'F3') {
        e?.preventDefault()
        if (editorRef.current) editorRef.current.execCommand('findnext')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [beautify, saveToFile, openFile])

  useEffect(() => {
    try {
      JSON.parse(value)
      setError(null)
    } catch (error) {
      if (error instanceof Error) {
        if (!value) return setError(null)
        const message = error.message
        const matches = message.match(/line ?(\d+) ?column ?(\d+)/)
        if (!matches)
          return setError({
            type: 'error',
            text: message,
            column: 0,
            row: 0
          })
        const line = Number(matches[1])
        const column = Number(matches[2])
        setError({
          type: 'error',
          text: message,
          column: column - 1,
          row: line - 1
        })
      }
    }
  }, [value])

  const editorTheme = useMemo(() => {
    if (theme === 'system') {
      switch (systemTheme) {
        case 'dark': {
          return 'twilight'
        }
        case 'light': {
          return 'chrome'
        }
        default: {
          return 'chrome'
        }
      }
    }
    return theme === 'dark' ? 'twilight' : 'chrome'
  }, [theme, systemTheme])

  return (
    <>
      <input
        type="file"
        id="input"
        className="hidden"
        accept=".json"
        ref={inputRef}
      />
      <div className="mt-2 flex justify-between">
        <Title>JSON Editor</Title>
        <JSONEditorToolbar
          onBeautify={beautify}
          onSave={saveToFile}
          onFileOpen={openFile}
          onJsonNameChange={setJsonName}
          jsonName={jsonName}
        />
      </div>
      <JSONEditorSummary error={error?.text} hasValue={value.length > 0} />
      <AceEditor
        mode="json"
        theme={editorTheme}
        onChange={handleChange}
        name="json_code"
        editorProps={{ $blockScrolling: true, maxLines: Infinity }}
        value={value}
        width="100%"
        setOptions={{}}
        height="100%"
        tabSize={2}
        fontSize={16}
        annotations={error ? [error] : []}
        className="flex-1 text-base"
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        onLoad={(editor) => {
          editorRef.current = editor
        }}
        focus
      />
    </>
  )
}
