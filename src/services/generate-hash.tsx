'use server'
import { createHash } from 'node:crypto'

async function sha1(seed: string) {
  return createHash('sha1').update(seed).digest('hex')
}

async function sha256(seed: string) {
  return createHash('sha256').update(seed).digest('hex')
}

async function sha512(seed: string) {
  return createHash('sha512').update(seed).digest('hex')
}

async function generate(hash: 'sha1' | 'sha256' | 'sha512', seed: string) {
  return await { sha1, sha256, sha512 }[hash](seed)
}

export default generate
