/**
 * Generates a random 4-character hexadecimal string
 * @returns {string} A 4-character hexadecimal string
 */
const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x1_00_00)
    .toString(16)
    .slice(1)

/**
 * Generates a GUID (Globally Unique Identifier) string
 * @returns {string} A GUID string in format "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
 */
export default function guid(): string {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
