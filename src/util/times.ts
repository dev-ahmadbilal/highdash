/**
 * Invokes the iteratee `n` times, returning an array of the results of each invocation.
 * The iteratee is invoked with one argument: (index).
 *
 * @param n - The number of times to invoke `iteratee`
 * @param iteratee - The function invoked per iteration
 * @returns Returns the array of results
 *
 * @example
 * ```typescript
 * times(3, String);
 * // => ['0', '1', '2']
 *
 * times(4, () => 0);
 * // => [0, 0, 0, 0]
 * ```
 */
export function times<T>(n: number, iteratee: (index: number) => T): T[] {
  if (n < 1 || !Number.isInteger(n)) {
    return []
  }

  const result: T[] = []
  for (let i = 0; i < n; i++) {
    result.push(iteratee(i))
  }
  return result
}
