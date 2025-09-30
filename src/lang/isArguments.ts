/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an `arguments` object, else `false`
 *
 * @example
 * ```typescript
 * isArguments(function() { return arguments; }());
 * // => true
 *
 * isArguments([1, 2, 3]);
 * // => false
 * ```
 */
export function isArguments(value: unknown): value is IArguments {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}
