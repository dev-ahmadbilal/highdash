/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @param prefix - The value to prefix the ID with
 * @returns Returns the unique ID
 *
 * @example
 * ```typescript
 * uniqueId('contact_');
 * // => 'contact_1'
 *
 * uniqueId();
 * // => '2'
 * ```
 */
let idCounter = 0;

export function uniqueId(prefix: string = ''): string {
  return `${prefix}${++idCounter}`;
}
