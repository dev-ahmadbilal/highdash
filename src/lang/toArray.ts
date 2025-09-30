/**
 * Converts `value` to an array.
 *
 * @param value - The value to convert
 * @returns Returns the converted array
 *
 * @example
 * ```typescript
 * toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * toArray(1);
 * // => []
 *
 * toArray(null);
 * // => []
 * ```
 */
export function toArray(value: unknown): unknown[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return [...value];
  }

  if (typeof value === 'string') {
    return value.split('');
  }

  if (typeof value === 'object') {
    return Object.values(value);
  }

  return [];
}
