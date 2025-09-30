/**
 * Splits `string` into an array of its words.
 *
 * @param string - The string to inspect
 * @param pattern - The pattern to match words
 * @returns Returns the words of `string`
 *
 * @example
 * ```typescript
 * words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 *
 * words('hello world');
 * // => ['hello', 'world']
 * ```
 */
export function words(string: string, pattern?: RegExp | string): string[] {
  if (typeof string !== 'string') {
    return [];
  }

  if (pattern === undefined) {
    // Default pattern approximating lodash: split camelCase/PascalCase and non-letters
    // - sequences of uppercase followed by lowercase (e.g., "Foo", "Bar")
    // - sequences of lowercase letters
    // - standalone uppercase sequences (e.g., "HTML")
    // Numbers are treated as separators (not returned)
    const defaultPattern = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g;
    const matches = string.match(defaultPattern);
    return matches ? matches : [];
  }

  if (typeof pattern === 'string') {
    pattern = new RegExp(pattern, 'g');
  }

  const matches = string.match(pattern);
  return matches || [];
}
