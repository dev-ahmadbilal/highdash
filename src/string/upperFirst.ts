/**
 * Converts the first character of `string` to upper case.
 *
 * @param string - The string to convert
 * @returns Returns the converted string
 *
 * @example
 * ```typescript
 * upperFirst('fred');
 * // => 'Fred'
 *
 * upperFirst('FRED');
 * // => 'FRED'
 * ```
 */
export function upperFirst(string: string): string {
  if (typeof string !== 'string' || string.length === 0) {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}
