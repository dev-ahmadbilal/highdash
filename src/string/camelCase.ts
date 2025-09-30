/**
 * Converts `string` to camel case.
 *
 * @param string - The string to convert
 * @returns Returns the camel cased string
 *
 * @example
 * ```typescript
 * camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * camelCase('fooBar');
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__');
 * // => 'fooBar'
 * ```
 */
export function camelCase(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
