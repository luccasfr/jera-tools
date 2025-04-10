'use server'
import { createHash } from 'node:crypto'

/**
 * Generate a sha1 hash from a seed
 * @param {string} seed - the seed to be hashed
 * @returns {Promise<string>} - the generated hash
 */
async function sha1(seed: string): Promise<string> {
  return createHash('sha1').update(seed).digest('hex')
}

/**
 * Generate a sha256 hash from a seed
 * @param {string} seed - the seed to be hashed
 * @returns {Promise<string>} - the generated hash
 */
async function sha256(seed: string): Promise<string> {
  return createHash('sha256').update(seed).digest('hex')
}

/**
 * Generate a sha512 hash from a seed
 * @param {string} seed - the seed to be hashed
 * @returns {Promise<string>} - the generated hash
 */
async function sha512(seed: string): Promise<string> {
  return createHash('sha512').update(seed).digest('hex')
}

/**
 * Generate a md5 hash from a seed
 * @param {string} seed - the seed to be hashed
 * @returns {Promise<string>} - the generated hash
 */
async function md5(seed: string): Promise<string> {
  return createHash('md5').update(seed).digest('hex')
}

/**
 * Generate a hash from a seed
 * @param {string} hash - the hash algorithm to use
 * @param {string} seed - the seed to be hashed
 * @returns {Promise<string>} - the generated hash
 */
async function hash(
  hash: 'md5' | 'sha1' | 'sha256' | 'sha512',
  seed: string
): Promise<string> {
  return await { md5, sha1, sha256, sha512 }[hash](seed)
}

export default hash
