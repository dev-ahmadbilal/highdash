/**
 * The opposite of `before`; this method creates a function that invokes `func` once it's called `n` or more times.
 *
 * @param n - The number of calls before `func` is invoked
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const saves = ['profile', 'settings'];
 * const done = after(saves.length, () => console.log('done saving!'));
 *
 * saves.forEach(save => {
 *   asyncSave({ 'type': save, 'complete': done });
 * });
 * // => Logs 'done saving!' after the two async saves have completed
 * ```
 */
export function after<T extends (...args: unknown[]) => unknown>(n: number, func: T): T {
  let count = 0
  return ((...args: Parameters<T>) => {
    count++
    if (count >= n) {
      return func(...args)
    }
  }) as T
}
