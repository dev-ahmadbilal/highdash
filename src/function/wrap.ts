/**
 * Creates a function that provides `value` to `wrapper` as its first argument. Any additional arguments provided to the function are appended to those provided to the `wrapper`.
 *
 * @param value - The value to wrap
 * @param wrapper - The wrapper function
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const p = wrap(escape, (func, text) => '<p>' + func(text) + '</p>');
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 * ```
 */
export function wrap<T, R>(value: T, wrapper: (func: T, ...args: unknown[]) => R): (...args: unknown[]) => R {
  return function (this: unknown, ...args: unknown[]) {
    return wrapper.apply(this as any, [value, ...args]);
  } as (...args: unknown[]) => R;
}
