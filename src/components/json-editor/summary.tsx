import { Check, X } from 'lucide-react'
import Summary from '../summary'

type JSONEditorSummaryProps = {
  error?: string
  hasValue?: boolean
}

export default function JSONEditorSummary({
  error,
  hasValue
}: JSONEditorSummaryProps) {
  return (
    <div
      className={`flex items-center gap-1 ${
        hasValue ? error && 'bg-red-500/200 text-red-500' : 'text-primary/60' }`}
    >
      {hasValue && (error ? <X size={18} /> : <Check size={18} />)}
      {hasValue ? (
        <p className="lowercase md:text-sm">{error ?? 'valid json'}</p>
      ) : (
        <Summary>Lint, edit and beautify your JSON.</Summary>
      )}
    </div>
  )
}
