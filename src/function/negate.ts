/**
 * Creates a function that negates the result of the predicate `func`.
 * The `func` predicate is invoked with the `this` binding and arguments of the created function.
 *
 * @param predicate - The predicate to negate
 * @returns Returns the new negated function
 *
 * @example
 * ```typescript
 * const isEven = (n: number) => n % 2 == 0;
 * const isOdd = negate(isEven);
 *
 * isOdd(3);
 * // => true
 *
 * isOdd(4);
 * // => false
 * ```
 */
export function negate<T extends (...args: unknown[]) => boolean>(predicate: T): T {
  return ((...args: Parameters<T>) => {
    return !predicate(...args)
  }) as T
}
