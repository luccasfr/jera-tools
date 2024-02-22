import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {}

export default function generateHash({}: Props) {
  return (
    <div className="space-y-4">
      <h1 className="font-mono text-2xl lowercase">Generate Hash</h1>
      <Select name="hash">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="select one hash" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sha1">sha1</SelectItem>
          <SelectItem value="sha256">sha256</SelectItem>
          <SelectItem value="sha512">sha512</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="type your phrase" />
      <Button className="float-right font-bold">generate</Button>
    </div>
  )
}
