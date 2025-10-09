/**
 * Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`.
 * The corresponding value of each key is the last element responsible for generating the key.
 * The iteratee is invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 * keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 * ```
 */
export function keyBy<T>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T) => unknown) | string,
): Record<string, T> {
  const result: Record<string, T> = {}

  if (!collection) {
    return result
  }

  const items = Array.isArray(collection) ? collection : Object.values(collection)
  const length = items.length

  if (length === 0) {
    return result
  }

  if (typeof iteratee === 'function') {
    // Function iteratee
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const key = String(iteratee(item))
      result[key] = item
    }
  } else {
    // String iteratee
    const path = iteratee as string
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = String((item as any)?.[path])
        result[key] = item
      }
    } else {
      // Complex path
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = String(get(item as unknown as Record<string, unknown>, path))
        result[key] = item
      }
    }
  }

  return result
}

import { get } from '../object/get.js'
