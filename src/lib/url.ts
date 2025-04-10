/**
 * Encode a string to url encoded format
 * @param {string} content - the content to be encoded
 * @returns {Promise<string>} - the encoded content
 */
export function urlEncode(content: string): string {
  return encodeURIComponent(content)
}

/**
 * Decode a url encoded string
 * @param {string} content - the content to be decoded
 * @returns {Promise<string>} - the decoded content
 */
export function urlDecode(content: string): string {
  return decodeURIComponent(content)
}
