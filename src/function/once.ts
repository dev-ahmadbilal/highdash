/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * The `func` is invoked with the `this` binding and arguments of the created function.
 *
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const initialize = once(() => console.log('Initialized'));
 * initialize();
 * // => 'Initialized'
 * initialize();
 * // => 'Initialized' (no output)
 * ```
 */
export function once<T extends (...args: unknown[]) => unknown>(func: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!called) {
      called = true;
      result = func.apply(this, args) as ReturnType<T>;
    }
    return result;
  } as T;
}
