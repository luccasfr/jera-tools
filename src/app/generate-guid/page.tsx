'use client'
import Summary from '@/components/summary'
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import generateGuid from '@/services/generate-guid'
import { Copy, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

export default function GenerateGuidPage({}: Props) {
  const [guid, setGuid] = useState('')

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error('clipboard not available', {
        description: 'Your browser does not support clipboard access',
      })
      return
    }
    navigator.clipboard.writeText(guid)
    toast.info('copied to clipboard', {
      description: `The passphrase has been copied to your clipboard`,
    })
  }

  const handleGuidGenerate = async () => {
    const guid = await generateGuid()
    setGuid(guid)
  }

  useEffect(() => {
    handleGuidGenerate()
  }, [])

  return (
    <div className="space-y-4">
      <Title>generate guid</Title>
      <Summary>Generate a globally unique identifier (GUID).</Summary>
      <div
        className={`relative break-words rounded border-[1px] border-input py-2 pl-3 pr-8 font-mono md:text-sm`}
      >
        <Button
          variant="outline"
          className="absolute right-9 top-1/2 h-6 w-6 -translate-y-1/2"
          size="icon"
          onClick={handleGuidGenerate}
        >
          <RefreshCcw size={12} />
        </Button>
        <Button
          variant="outline"
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
          size="icon"
          onClick={handleCopy}
        >
          <Copy size={12} />
        </Button>
        {guid}
      </div>
    </div>
  )
}
