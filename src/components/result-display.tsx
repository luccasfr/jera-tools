import { type VariantProps, cva } from 'class-variance-authority'
import { Copy } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import Title from './title'
import { Button } from './ui/button'

type ResultDisplayProps = {
  contentName: string
  content: string
  variant?: VariantProps<typeof resultDisplayVariants>['variant']
  className?: string
  titleInside?: boolean
  excerpt?: string
}

const resultDisplayVariants = cva(
  'relative break-words rounded border-[1px] border-input py-2 pl-3 pr-8',
  {
    variants: {
      variant: {
        default: '',
        mono: 'font-mono',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export default function ResultDisplay({
  contentName,
  content,
  variant,
  className,
  titleInside,
  excerpt,
}: ResultDisplayProps) {
  const resultDisplayRef = useRef<HTMLDivElement>(null)
  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error('clipboard not available', {
        description: 'Your browser does not support clipboard access',
      })
      return
    }
    navigator.clipboard.writeText(content)
    toast.info('copied to clipboard', {
      description: `The ${contentName} has been copied to your clipboard`,
    })
  }

  useEffect(() => {
    if (!resultDisplayRef.current) return
    if (content === '') return
    resultDisplayRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [content])

  return (
    <div className="space-y-2">
      {!titleInside && <Title variant="sub-title">{contentName}</Title>}
      <div
        className={resultDisplayVariants({ variant, className })}
        ref={resultDisplayRef}
      >
        {titleInside && (
          <p className="absolute -top-4 left-2 rounded bg-background p-1 font-sans text-sm font-bold">
            {contentName}
          </p>
        )}
        <Button
          variant="outline"
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
          size="icon"
          onClick={handleCopy}
        >
          <Copy size={12} />
        </Button>
        <p>{excerpt ?? content}</p>
      </div>
    </div>
  )
}
