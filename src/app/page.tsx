import Summary from '@/components/summary'
import Title from '@/components/title'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'home / jera.tools',
  description: 'tools for jerasoft developers'
}

export default function Home() {
  return (
    <>
      <Title>Welcome to Jera Tools</Title>
      <Summary>pick a tool from the menubar.</Summary>
    </>
  )
}
