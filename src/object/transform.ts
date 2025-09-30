/**
 * An alternative to `reduce`; this method transforms `object` to a new `accumulator` object which is the result of running each of its own enumerable string keyed properties thru `iteratee`, with each invocation potentially mutating the `accumulator` object.
 *
 * @param object - The object to iterate over
 * @param iteratee - The function invoked per iteration
 * @param accumulator - The custom accumulator value
 * @returns Returns the accumulated value
 *
 * @example
 * ```typescript
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 * ```
 */
export function transform<T, R>(
  object: T[] | Record<string, T> | null | undefined,
  iteratee: (accumulator: R, value: T, key: number | string, object: T[] | Record<string, T>) => R | false,
  accumulator: R,
): R {
  if (!object) {
    return accumulator;
  }

  let result = accumulator;

  if (Array.isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      const value = object[i];
      const newResult = iteratee(result, value, i, object);
      if (newResult === false) {
        break;
      }
      result = newResult;
    }
  } else if (typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const value = object[key];
        const newResult = iteratee(result, value, key, object);
        if (newResult === false) {
          break;
        }
        result = newResult;
      }
    }
  }

  return result;
}
