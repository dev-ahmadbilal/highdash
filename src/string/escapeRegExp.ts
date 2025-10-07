/**
 * Escapes the `RegExp` special characters "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|", "\" in `string`.
 *
 * @param string - The string to escape
 * @returns Returns the escaped string
 *
 * @example
 * ```typescript
 * escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\\[lodash\\]\\(https://lodash\\.com/\\)'
 * ```
 */
export function escapeRegExp(string: string): string {
  if (typeof string !== 'string') {
    return ''
  }

  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  const reHasRegExpChar = RegExp(reRegExpChar.source)

  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string
}
