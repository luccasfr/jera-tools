'use server'

export default async function urlEncode(content: string) {
  return encodeURIComponent(content)
}
