import { isArrayLike } from './isArrayLike';

/**
 * This method is like `isArrayLike` except that it also checks if `value` is an object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an array-like object, else `false`
 *
 * @example
 * ```typescript
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * isArrayLikeObject(document.body.children);
 * // => true
 *
 * isArrayLikeObject('abc');
 * // => false
 * ```
 */
export function isArrayLikeObject(value: unknown): value is ArrayLike<unknown> {
  return isArrayLike(value) && typeof value === 'object';
}
