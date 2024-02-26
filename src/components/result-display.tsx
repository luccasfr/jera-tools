import React, { Fragment } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { VariantProps, cva } from 'class-variance-authority'
import Title from './title'

type ResultDisplayProps = {
  contentName: string
  content: string
  variant?: VariantProps<typeof resultDisplayVariants>['variant']
  className?: string
}

const resultDisplayVariants = cva(
  'relative break-words rounded border-[1px] border-input py-2 pl-3 pr-8 md:text-sm',
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
}: ResultDisplayProps) {
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

  return (
    <div className="space-y-2">
      <Title variant="sub-title">{contentName}</Title>
      <div className={resultDisplayVariants({ variant, className })}>
        <Button
          variant="outline"
          className="absolute right-1 top-1 h-6 w-6"
          size="icon"
          onClick={handleCopy}
        >
          <Copy size={12} />
        </Button>
        <p>{content}</p>
      </div>
    </div>
  )
}
