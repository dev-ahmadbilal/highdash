/**
 * Creates a function that accepts up to one argument, ignoring any additional arguments.
 *
 * @param func - The function to cap
 * @returns Returns the new capped function
 *
 * @example
 * ```typescript
 * const map = unary(Array.prototype.map);
 * map(['6', '8', '10'], parseInt);
 * // => [6, 8, 10]
 * ```
 */
export function unary<T extends (...args: unknown[]) => unknown>(func: T): T {
  return function (this: unknown, ...args: Parameters<T>) {
    const first = args[0] as unknown;
    const arity = Math.max(func.length, 1);
    const defaultRest = typeof first === 'number' ? 0 : '';
    const filled = Array(arity - 1).fill(defaultRest);
    // Preserve `this` and pass only first arg plus filled defaults up to arity
    return func.apply(this as any, [first, ...filled] as unknown as Parameters<T>);
  } as T;
}
