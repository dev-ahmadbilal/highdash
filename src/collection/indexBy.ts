/**
 * Indexes a collection into a Map of key -> last item with that key.
 *
 * @example
 * indexBy([{id:1},{id:2}], 'id') // Map { 1 => {id:1}, 2 => {id:2} }
 */
export function indexBy<T, K>(collection: T[] | Record<string, T>, selector: ((value: T) => K) | string): Map<K, T> {
  const map = new Map<K, T>();
  if (!collection) return map;
  const items = Array.isArray(collection) ? collection : Object.values(collection);
  const getKey = typeof selector === 'function' ? selector : (item: T) => (item as any)?.[selector as string];
  for (const item of items) {
    map.set(getKey(item), item);
  }
  return map;
}
