import BCryptCompare from '@/components/bcrypt/compare'
import BCryptGenerate from '@/components/bcrypt/generate'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'bcrypt'
}

export default function BCryptPage() {
  return (
    <>
      <BCryptGenerate />
      <Separator />
      <BCryptCompare />
    </>
  )
}
