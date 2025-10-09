/**
 * Creates a function that invokes `func` with arguments arranged according to the specified `indexes` where the argument value at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.
 *
 * @param func - The function to rearg
 * @param indexes - The arranged argument indexes
 * @returns Returns the new rearged function
 *
 * @example
 * ```typescript
 * const rearged = rearg((a, b, c) => [a, b, c], [2, 0, 1]);
 * rearged('b', 'c', 'a');
 * // => ['a', 'b', 'c']
 * ```
 */
export function rearg<T extends (...args: unknown[]) => unknown>(func: T, indexes: number[]): T {
  return ((...args: Parameters<T>) => {
    const reargedArgs = indexes.map((index) => args[index])
    return func(...reargedArgs)
  }) as T
}
