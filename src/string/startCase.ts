/**
 * Converts `string` to start case.
 *
 * @param string - The string to convert
 * @returns Returns the start cased string
 *
 * @example
 * ```typescript
 * startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * startCase('fooBar');
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 * ```
 */
export function startCase(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\s_-]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}
