import BCryptCompare from '@/components/bcrypt/compare'
import BCryptGenerate from '@/components/bcrypt/generate'
import { Separator } from '@/components/ui/separator'

export default function BCryptPage() {
  return (
    <div className="space-y-4">
      <BCryptGenerate />
      <Separator />
      <BCryptCompare />
    </div>
  )
}
