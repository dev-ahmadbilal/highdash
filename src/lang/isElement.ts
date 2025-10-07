/**
 * Checks if `value` is likely a DOM element.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a DOM element, else `false`
 *
 * @example
 * ```typescript
 * isElement(document.body);
 * // => true
 *
 * isElement('<body>');
 * // => false
 * ```
 */
export function isElement(value: unknown): value is Element {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as any).nodeType === 'number' &&
    (value as any).nodeType === 1
  )
}
