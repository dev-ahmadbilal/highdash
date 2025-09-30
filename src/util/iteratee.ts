/**
 * Creates a function that invokes `iteratee` with the arguments it receives and returns its result.
 *
 * @param iteratee - The iteratee to wrap
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'a': 2 }];
 * const func = iteratee('a');
 * map(objects, func);
 * // => [1, 2]
 * ```
 */
export function iteratee<T = unknown>(iteratee: string | ((value: T) => unknown) | T): (value: T) => unknown {
  if (typeof iteratee === 'function') {
    return iteratee as (value: T) => unknown;
  }

  if (typeof iteratee === 'string') {
    // Support deep path access like 'a.b[0].c'
    const raw = iteratee;
    const path = raw
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .filter(Boolean);
    return (value: T) => {
      // If value is not object-like, treat as equality predicate against the raw string
      if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
        return (value as unknown) === (raw as unknown);
      }
      let current: unknown = value;
      for (const key of path) {
        if (current === null) return undefined;
        current = current?.[key as keyof typeof current];
      }
      return current;
    };
  }

  if (typeof iteratee === 'object' && iteratee !== null) {
    const src = iteratee as Record<string, unknown>;
    const isMatchDeep = (obj: unknown, srcObj: unknown): boolean => {
      if (obj === srcObj) return true;
      if (obj === null || srcObj === null) return false;
      if (typeof srcObj !== 'object') return obj === srcObj;
      for (const key of Object.keys(srcObj)) {
        if (!isMatchDeep(obj?.[key as keyof typeof obj], srcObj[key as keyof typeof srcObj])) return false;
      }
      return true;
    };
    return (value: T) => isMatchDeep(value as unknown, src);
  }

  return (value: T) => value === iteratee;
}
