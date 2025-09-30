/**
 * Creates a function that memoizes the result of `func`. If `resolver` is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function.
 * By default, the first argument provided to the memoized function is used as the map cache key.
 *
 * @param func - The function to have its output memoized
 * @param resolver - The function to resolve the cache key
 * @returns Returns the new memoized function
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': 2 };
 * const other = { 'c': 3, 'd': 4 };
 * const values = memoize(values);
 * values(object);
 * // => [1, 2]
 * values(other);
 * // => [3, 4]
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 * ```
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  func: T,
  resolver?: (...args: Parameters<T>) => unknown,
): T & { cache: Map<unknown, ReturnType<T>> } {
  const cache = new Map<unknown, ReturnType<T>>();

  const memoized = ((...args: Parameters<T>) => {
    const key = resolver ? resolver(...args) : args[0];

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result as ReturnType<T>);
    return result;
  }) as T & { cache: Map<unknown, ReturnType<T>> };

  memoized.cache = cache;
  return memoized;
}
