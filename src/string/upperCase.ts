/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @param string - The string to convert
 * @returns Returns the upper cased string
 *
 * @example
 * ```typescript
 * upperCase('--foo-bar--');
 * // => 'FOO BAR'
 *
 * upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__');
 * // => 'FOO BAR'
 * ```
 */
export function upperCase(string: string): string {
  if (typeof string !== 'string') {
    return ''
  }

  return (
    string
      // Add space between lowercase and uppercase letters (fooBar → foo Bar)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Add space between letters and numbers
      .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
      // Replace non-alphanumeric with spaces
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      // Remove standalone numbers
      .replace(/\b\d+\b/g, ' ')
      // Collapse multiple spaces
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()
  )
}
