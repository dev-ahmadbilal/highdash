/**
 * Counts items by key into a Map of key -> count.
 *
 * @example
 * countByToMap(['a','bb','c'], 'length') // Map { 1 => 2, 2 => 1 }
 */
export function countByToMap<T, K>(
  collection: T[] | Record<string, T>,
  selector: ((value: T) => K) | string,
): Map<K, number> {
  const map = new Map<K, number>();
  if (!collection) return map;
  const items = Array.isArray(collection) ? collection : Object.values(collection);
  const getKey = typeof selector === 'function' ? selector : (item: T) => (item as any)?.[selector as string];
  for (const item of items) {
    const k = getKey(item);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}
