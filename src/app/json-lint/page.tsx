'use client'
import { useCallback, useEffect, useState } from 'react'
import AceEditor, { IMarker } from 'react-ace'
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/theme-chrome'
import { Check, Indent, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import Summary from '@/components/summary'

export default function Page() {
  const [value, setValue] = useState('')
  const { theme, systemTheme } = useTheme()
  const [error, setError] = useState<{
    row?: number
    column?: number
    text: string
    type: string
  } | null>(null)

  const beautify = useCallback(() => {
    try {
      const parsed = JSON.parse(value)
      setValue(JSON.stringify(parsed, null, 2))
      toast.success('json beautified')
    } catch (e) {
      console.error(e)
    }
  }, [value])

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'F') {
        beautify()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [beautify])

  useEffect(() => {
    try {
      JSON.parse(value)
      setError(null)
    } catch (e) {
      if (e instanceof Error) {
        if (!value) return setError(null)
        const message = e.message
        const matches = message.match(/line ?([0-9]+) ?column ?([0-9]+)/)
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

  const editorTheme =
    theme === 'system'
      ? systemTheme === 'dark'
        ? 'chaos'
        : 'chrome'
      : theme === 'dark'
        ? 'chaos'
        : 'chrome'

  return (
    <div className="h-full space-y-2 pb-4">
      <div className="flex justify-between">
        <Title>JSON Lint</Title>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex-shrink-0"
                variant="outline"
                size="icon"
                onClick={beautify}
              >
                <Indent />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="md:text-xs">Beautify JSON (Shift + Alt + F)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className={`flex items-center gap-1 ${value ? (error?.text ? 'bg-red-500/200 text-red-500' : '') : 'text-primary/60'}`}
      >
        {value ? error?.text ? <X size={18} /> : <Check size={18} /> : null}
        {value ? (
          <p className="lowercase md:text-sm ">{error?.text ?? 'valid json'}</p>
        ) : (
          <Summary>Validate and beautify your JSON.</Summary>
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
      />
    </div>
  )
}
