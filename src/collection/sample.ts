/**
 * Gets a random element from `collection`.
 *
 * @param collection - The collection to sample
 * @returns Returns the random element
 *
 * @example
 * ```typescript
 * sample([1, 2, 3, 4]);
 * // => 2
 * ```
 */
export function sample<T>(collection: T[] | Record<string, T>): T | undefined {
  if (!collection) {
    return undefined
  }

  const items = Array.isArray(collection) ? collection : Object.values(collection)

  if (items.length === 0) {
    return undefined
  }

  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}
