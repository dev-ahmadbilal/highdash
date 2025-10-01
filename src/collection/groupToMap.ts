/**
 * Groups a collection by a key selector into a Map of key -> items[].
 *
 * @example
 * groupToMap(['a','bb','c'], 'length') // Map { 1 => ['a','c'], 2 => ['bb'] }
 */
export function groupToMap<T, K>(
  collection: T[] | Record<string, T>,
  selector: ((value: T) => K) | string,
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  if (!collection) return map;
  const items = Array.isArray(collection) ? collection : Object.values(collection);
  const getKey = typeof selector === 'function' ? selector : (item: T) => (item as any)?.[selector as string];
  for (const item of items) {
    const key = getKey(item);
    const arr = map.get(key);
    if (arr) arr.push(item);
    else map.set(key, [item]);
  }
  return map;
}
