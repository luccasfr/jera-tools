'use server'

import { type BcryptCompareType, type BcryptGenerateType } from '@/types/bcrypt'
import bcrypt from 'bcrypt'

export async function generateBcryptHash({
  text,
  saltRounds,
}: BcryptGenerateType): Promise<string> {
  const response = await bcrypt.hash(text, saltRounds ?? 10)
  return response
}

export async function compareBcryptHash({
  text,
  hash,
}: BcryptCompareType): Promise<boolean> {
  const response = await bcrypt.compare(text, hash)
  return response
}
