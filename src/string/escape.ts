/**
 * Converts the characters "&", "<", ">", '"', "'", and "`" in `string` to their corresponding HTML entities.
 *
 * @param string - The string to escape
 * @returns Returns the escaped string
 *
 * @example
 * ```typescript
 * escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 * ```
 */
export function escape(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
  };

  return string.replace(/[&<>"'`]/g, (char) => htmlEscapes[char] || char);
}
