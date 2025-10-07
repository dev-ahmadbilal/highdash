/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @param string - The string to convert
 * @returns Returns the lower cased string
 *
 * @example
 * ```typescript
 * lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * lowerCase('fooBar');
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 * ```
 */
export function lowerCase(string: string): string {
  if (typeof string !== 'string') {
    return ''
  }

  return (
    string
      // insert space between lowercase/uppercase
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // insert space between letters and numbers
      .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
      // remove all non-alphanumeric characters
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      // remove numbers
      .replace(/\b\d+\b/g, ' ')
      // collapse multiple spaces
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
  )
}
