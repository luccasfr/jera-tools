import JsonEditor from '@/components/json-editor'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'json editor'
}

export default function JsonEditorPage() {
  return (
    <div className="relative flex h-[calc(100dvh-100px)] flex-col gap-4">
      <JsonEditor />
    </div>
  )
}
