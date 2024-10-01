'use client'

// Primary imports
import AceEditor from 'react-ace'
// Remaining imports
import JSONEditorToolbar from '@/components/json-editor-toolbar'
import Summary from '@/components/summary'
import Title from '@/components/title'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-dracula'
import { Check, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export default function JsonLintPage() {
  const [value, setValue] = useState('')
  const { theme, systemTheme } = useTheme()
  const [jsonName, setJsonName] = useState('file.json')
  const [error, setError] = useState<{
    row?: number
    column?: number
    text: string
    type: string
  } | null>(null)
  const editorRef = useRef<AceEditor | null>(null)
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
        if (editorRef.current) editorRef.current.editor.execCommand('find')
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
        if (editorRef.current) editorRef.current.editor.execCommand('findnext')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [beautify, saveToFile, openFile])

  useEffect(() => {
    try {
      JSON.parse(value)
      setError(null)
    } catch (error_) {
      if (error_ instanceof Error) {
        if (!value) return setError(null)
        const message = error_.message
        const matches = message.match(/line ?(\d+) ?column ?(\d+)/)
        if (!matches)
          return setError({
            type: 'error',
            text: message,
          })
        const line = Number(matches[1])
        const column = Number(matches[2])
        setError({
          type: 'error',
          text: message,
          column: column - 1,
          row: line - 1,
        })
      }
    }
  }, [value])

  const getTheme = () => {
    if (theme === 'system') {
      switch (systemTheme) {
        case 'dark': {
          return 'dracula'
        }
        case 'light': {
          return 'chrome'
        }
        default: {
          return 'chrome'
        }
      }
    }
    return theme === 'dark' ? 'dracula' : 'chrome'
  }

  const editorTheme = getTheme()

  return (
    <div
      className="h-full space-y-2 pb-4"
      style={{
        maxHeight: 'calc(100vh - 150px)',
      }}
    >
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
      <div
        className={`flex items-center gap-1 ${value ? (error?.text ? 'bg-red-500/200 text-red-500' : '') : 'text-primary/60'}`}
      >
        {value && error?.text ? <X size={18} /> : <Check size={18} />}
        {value ? (
          <p className="lowercase md:text-sm ">{error?.text ?? 'valid json'}</p>
        ) : (
          <Summary>Lint, edit and beautify your JSON.</Summary>
        )}
      </div>
      <AceEditor
        mode="json"
        theme={editorTheme}
        onChange={handleChange}
        name="json_code"
        editorProps={{ $blockScrolling: true, maxLines: Infinity }}
        value={value}
        width="100%"
        height="100%"
        tabSize={2}
        fontSize={16}
        annotations={error ? [error] : undefined}
        className="text-base"
        ref={editorRef}
      />
    </div>
  )
}
