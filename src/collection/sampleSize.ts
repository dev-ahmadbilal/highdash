/**
 * Gets `n` random elements at unique keys from `collection` up to the size of `collection`.
 *
 * @param collection - The collection to sample
 * @param n - The number of elements to sample
 * @returns Returns the random elements
 *
 * @example
 * ```typescript
 * sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 * ```
 */
export function sampleSize<T>(collection: T[] | Record<string, T>, n: number = 1): T[] {
  if (!collection || n <= 0) {
    return [];
  }

  const items = Array.isArray(collection) ? collection : Object.values(collection);

  if (items.length === 0) {
    return [];
  }

  const sampleSize = Math.min(n, items.length);
  const result: T[] = [];
  const indices = new Set<number>();

  while (result.length < sampleSize) {
    const randomIndex = Math.floor(Math.random() * items.length);
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(items[randomIndex]);
    }
  }

  return result;
}
