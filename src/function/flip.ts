/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @param func - The function to flip arguments for
 * @returns Returns the new flipped function
 *
 * @example
 * ```typescript
 * const flipped = flip((...args) => args);
 *
 * flipped('a', 'b', 'c', 'd');
 * // => ['d', 'c', 'b', 'a']
 * ```
 */
export function flip<T extends (...args: unknown[]) => unknown>(func: T): T {
  return ((...args: Parameters<T>) => {
    if (args.length < 2) return func(...(args as any));
    const [first, second, ...rest] = args as unknown[];
    return func(...([second, first, ...rest] as any));
  }) as T;
}
