import {
  Braces,
  Database,
  FileJson,
  Hash,
  HomeIcon,
  Percent
} from 'lucide-react'

const menuItems = [
  { href: '/', icon: <HomeIcon size={14} />, label: 'home' },
  { href: '/generate-hash', icon: <Hash size={14} />, label: 'generate hash' },
  { href: '/url-encode', icon: <Percent size={14} />, label: 'url encode' },
  {
    href: '/generate-guid',
    icon: <Braces size={14} />,
    label: 'generate guid'
  },
  {
    href: '/database-url',
    icon: <Database size={14} />,
    label: 'generate db url'
  },
  { href: '/file-to-base64', icon: <Hash size={14} />, label: 'file to b64' },
  { href: '/text-to-base64', icon: <Hash size={14} />, label: 'text to b64' },
  { href: '/json-editor', icon: <FileJson size={14} />, label: 'json editor' },
  { href: '/bcrypt', icon: <Hash size={14} />, label: 'bcrypt' }
]

export default menuItems
