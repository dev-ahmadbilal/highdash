/**
 * Checks if `value` is array-like. A value is considered array-like if it's not a function and has a `valueOf` method that returns an object with a `length` property.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is array-like, else `false`
 *
 * @example
 * ```typescript
 * isArrayLike([1, 2, 3]);
 * // => true
 *
 * isArrayLike(document.body.children);
 * // => true
 *
 * isArrayLike('abc');
 * // => true
 *
 * isArrayLike(Function);
 * // => false
 * ```
 */
export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  if (value === null || typeof value === 'function') {
    return false;
  }

  // Handle strings separately since they have length but 'length' in 'abc' throws
  if (typeof value === 'string') {
    return true;
  }

  // For objects, check if they have a length property
  if (typeof value === 'object' && value !== null) {
    return (
      'length' in value &&
      typeof (value as ArrayLike<unknown>).length === 'number' &&
      (value as ArrayLike<unknown>).length >= 0 &&
      (value as ArrayLike<unknown>).length % 1 === 0
    );
  }

  return false;
}
