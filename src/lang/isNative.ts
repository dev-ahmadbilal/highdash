/**
 * Checks if `value` is a native function.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a native function, else `false`
 *
 * @example
 * ```typescript
 * isNative(Array.prototype.push);
 * // => true
 *
 * isNative(isNaN);
 * // => true
 *
 * isNative(() => {});
 * // => false
 * ```
 */
export function isNative(value: unknown): value is Function {
  if (typeof value !== 'function') {
    return false;
  }

  const func = value as Function;
  const funcString = func.toString();

  // Check for native function patterns
  return (
    funcString.includes('[native code]') ||
    funcString.includes('[object Function]') ||
    /^function\s+\w*\s*\(\s*\)\s*\{\s*\[native code\]\s*\}$/.test(funcString)
  );
}
