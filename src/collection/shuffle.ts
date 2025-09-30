/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.
 *
 * @param collection - The collection to shuffle
 * @returns Returns the new shuffled array
 *
 * @example
 * ```typescript
 * shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 * ```
 */
export function shuffle<T>(collection: T[] | Record<string, T>): T[] {
  if (!collection) {
    return [];
  }

  const items = Array.isArray(collection) ? [...collection] : Object.values(collection);

  if (items.length === 0) {
    return [];
  }

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}
