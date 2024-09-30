import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FolderOpen, Indent, Save } from 'lucide-react'
import { Input } from './ui/input'

type JSONEditorToolbarProps = {
  onBeautify: () => void
  onSave: () => void
  onFileOpen: () => void
  onJsonNameChange: (name: string) => void
  jsonName: string
}
export default function JSONEditorToolbar({
  onBeautify,
  onSave,
  onFileOpen,
  onJsonNameChange,
  jsonName,
}: JSONEditorToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 w-8 flex-shrink-0"
              variant="outline"
              size="icon"
              onClick={onBeautify}
            >
              <Indent size={19} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="md:text-xs">beautify json (shift + alt + f)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 w-8 flex-shrink-0"
              variant="outline"
              size="icon"
              onClick={onFileOpen}
            >
              <FolderOpen size={19} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="md:text-xs">open json (ctrl + o)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 w-8 flex-shrink-0"
              variant="outline"
              size="icon"
              onClick={onSave}
            >
              <Save size={19} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="md:text-xs">save to file (ctrl + s)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        placeholder="Nome do JSON"
        className="h-8"
        onChange={(e) => {
          onJsonNameChange(e.target.value)
        }}
        value={jsonName}
      />
    </div>
  )
}
