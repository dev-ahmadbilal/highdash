/**
 * Truncates `string` if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string which defaults to "...".
 *
 * @param string - The string to truncate
 * @param options - The options object
 * @param options.length - The maximum string length (default: 30)
 * @param options.omission - The string to indicate text is omitted (default: '...')
 * @param options.separator - The separator pattern to truncate at
 * @returns Returns the truncated string
 *
 * @example
 * ```typescript
 * truncate('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * truncate('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': ' ' });
 * // => 'hi-diddly-ho there,...'
 * ```
 */
export function truncate(
  string: string,
  options: {
    length?: number
    omission?: string
    separator?: string | RegExp
  } = {},
): string {
  if (typeof string !== 'string') {
    return ''
  }

  const { length = 30, omission = '...', separator } = options

  if (string.length <= length) {
    return string
  }

  const omissionLength = omission.length
  const truncateLength = length - omissionLength

  if (truncateLength < 1) {
    return omission
  }

  let truncated = string.slice(0, truncateLength)

  if (separator) {
    const separatorRegex = typeof separator === 'string' ? new RegExp(separator, 'g') : separator
    if (separatorRegex.global) {
      const lastMatch = [...truncated.matchAll(separatorRegex)].pop()
      if (lastMatch && lastMatch.index !== undefined) {
        truncated = truncated.slice(0, lastMatch.index)
      }
    } else {
      const globalRegex = new RegExp(separatorRegex.source, 'g')
      const lastMatch = [...truncated.matchAll(globalRegex)].pop()
      if (lastMatch && lastMatch.index !== undefined) {
        truncated = truncated.slice(0, lastMatch.index)
      }
    }
  }

  return truncated + omission
}
