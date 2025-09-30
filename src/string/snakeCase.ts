/**
 * Converts `string` to snake case.
 *
 * @param string - The string to convert
 * @returns Returns the snake cased string
 *
 * @example
 * ```typescript
 * snakeCase('--foo-bar--');
 * // => 'foo_bar'
 *
 * snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * snakeCase('__FOO_BAR__');
 * // => 'foo_bar'
 * ```
 */
export function snakeCase(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .replace(/[^\w_]/g, '')
    .toLowerCase();
}
