/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object.
 * Source properties that resolve to `undefined` are skipped if a destination value exists.
 * Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 * merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 * ```
 */
export function merge<T extends Record<string, unknown>>(object: T, ...sources: Partial<T>[]): T {
  if (!isObject(object)) {
    return object
  }

  const seen = new WeakMap<object, object>()

  function isPlainObject(val: unknown): val is Record<string | symbol, unknown> {
    if (val === null || typeof val !== 'object') return false
    const proto = Object.getPrototypeOf(val)
    return proto === Object.prototype || proto === null
  }

  function mergeArrays(targetArr: unknown[], sourceArr: unknown[]): unknown[] {
    const maxLen = Math.max(targetArr.length, sourceArr.length)
    const result = targetArr
    for (let i = 0; i < maxLen; i++) {
      const t = result[i]
      const s = sourceArr[i]
      if (s === undefined) continue
      if (isPlainObject(t) && isPlainObject(s)) {
        result[i] = baseMerge(t, s)
      } else if (Array.isArray(t) && Array.isArray(s)) {
        result[i] = mergeArrays(t, s)
      } else {
        result[i] = s
      }
    }
    return result
  }

  function assignEnumerableSymbols(target: Record<string | symbol, unknown>, source: object): void {
    const symbols = Object.getOwnPropertySymbols(source)
    for (const sym of symbols) {
      const desc = Object.getOwnPropertyDescriptor(source, sym)
      if (desc && desc.enumerable) {
        const sVal = (source as any)[sym]
        const tVal = (target as any)[sym]
        if (isPlainObject(tVal) && isPlainObject(sVal)) {
          ;(target as any)[sym] = baseMerge(tVal, sVal)
        } else if (Array.isArray(tVal) && Array.isArray(sVal)) {
          ;(target as any)[sym] = mergeArrays(tVal, sVal)
        } else {
          ;(target as any)[sym] = sVal
        }
      }
    }
  }

  function baseMerge<TObj extends Record<string | symbol, unknown>>(
    target: TObj,
    source: Record<string | symbol, unknown>,
  ): TObj {
    if (seen.has(source as object)) {
      return target
    }
    seen.set(source as object, target as object)

    for (const key in source) {
      if (!Object.hasOwn(source, key)) continue
      const sVal = source[key as keyof typeof source]
      const tVal = target[key as keyof typeof target]

      if (Array.isArray(tVal) && Array.isArray(sVal)) {
        ;(target as any)[key] = mergeArrays(tVal, sVal)
        continue
      }

      if (isPlainObject(tVal) && isPlainObject(sVal)) {
        ;(target as any)[key] = baseMerge(
          tVal as Record<string | symbol, unknown>,
          sVal as Record<string | symbol, unknown>,
        )
        continue
      }

      if (isPlainObject(sVal) && !isPlainObject(tVal) && tVal !== undefined) {
        // If destination has a non-plain object and source is plain, overwrite (Lodash does overwrite non-mergeables)
        ;(target as any)[key] = baseMerge({} as Record<string, unknown>, sVal as Record<string, unknown>)
        continue
      }

      ;(target as any)[key] = sVal as unknown
    }

    // Merge enumerable symbol keys
    assignEnumerableSymbols(target, source)
    return target
  }

  for (const src of sources) {
    if (!isObject(src)) continue
    // Merge string-keyed enumerable own props
    baseMerge(object as unknown as Record<string | symbol, unknown>, src as unknown as Record<string | symbol, unknown>)
  }

  return object
}

/**
 * Checks if `value` is the language type of `Object` (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`).
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an object, else `false`
 */
function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}
