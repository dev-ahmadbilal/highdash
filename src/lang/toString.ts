/**
 * Converts `value` to a string. An empty string is returned for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @param value - The value to convert
 * @returns Returns the converted string
 *
 * @example
 * ```typescript
 * toString(null);
 * // => ''
 *
 * toString(-0);
 * // => '-0'
 *
 * toString([1, 2, 3]);
 * // => '1,2,3'
 * ```
 */
export function toString(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 0 && 1 / value < 0 ? '-0' : String(value);
  }

  if (typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    return String(value);
  }

  return String(value);
}
