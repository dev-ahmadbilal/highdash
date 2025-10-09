/**
 * Creates a new object by deeply merging own enumerable properties of the source objects into a copy of the destination.
 *
 * - Arrays are merged index-wise (recursively merging objects/arrays at the same index, overwriting otherwise)
 * - Non-plain objects are overwritten by assignment
 * - Enumerable symbol keys are merged
 * - Cycle-safe
 * - Immutable (does not mutate the input `object`)
 *
 * @example
 * const a = { a: [{ b: 2 }, { d: 4 }] };
 * const b = { a: [{ c: 3 }, { e: 5 }] };
 * const r = mergeDeep(a, b);
 * // => { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 */
export function mergeDeep<T extends Record<string, unknown>>(object: T, ...sources: Partial<T>[]): T {
  if (!isObject(object)) {
    return object
  }

  const seen = new WeakMap<object, object>()

  function isPlainObject(val: unknown): val is Record<string | symbol, unknown> {
    if (val === null || typeof val !== 'object') return false
    const proto = Object.getPrototypeOf(val)
    return proto === Object.prototype || proto === null
  }

  function cloneArray(arr: unknown[]): unknown[] {
    return arr.slice()
  }

  function cloneObject(obj: Record<string | symbol, unknown>): Record<string | symbol, unknown> {
    const out: Record<string | symbol, unknown> = {}
    for (const k in obj) {
      if (Object.hasOwn(obj, k)) out[k] = obj[k]
    }
    const syms = Object.getOwnPropertySymbols(obj)
    for (const s of syms) {
      const d = Object.getOwnPropertyDescriptor(obj, s)
      if (d && d.enumerable) out[s] = (obj as any)[s]
    }
    return out
  }

  function mergeArrays(targetArr: unknown[], sourceArr: unknown[]): unknown[] {
    const result = cloneArray(targetArr)
    const maxLen = Math.max(result.length, sourceArr.length)
    for (let i = 0; i < maxLen; i++) {
      const t = result[i]
      const s = sourceArr[i]
      if (s === undefined) continue
      if (Array.isArray(t) && Array.isArray(s)) {
        result[i] = mergeArrays(t, s)
      } else if (isPlainObject(t) && isPlainObject(s)) {
        result[i] = baseMerge(cloneObject(t), s)
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
        if (Array.isArray(tVal) && Array.isArray(sVal)) {
          ;(target as any)[sym] = mergeArrays(tVal, sVal)
        } else if (isPlainObject(tVal) && isPlainObject(sVal)) {
          ;(target as any)[sym] = baseMerge(cloneObject(tVal), sVal)
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
        ;(target as any)[key] = baseMerge(cloneObject(tVal), sVal)
        continue
      }
      if (isPlainObject(sVal) && !isPlainObject(tVal) && tVal !== undefined) {
        ;(target as any)[key] = baseMerge({} as Record<string, unknown>, sVal as Record<string, unknown>)
        continue
      }
      ;(target as any)[key] = sVal as unknown
    }

    assignEnumerableSymbols(target, source)
    return target
  }

  // Start from a shallow clone of the root object
  let result = (Array.isArray(object) ? cloneArray(object as unknown as unknown[]) : cloneObject(object)) as T
  for (const src of sources) {
    if (!isObject(src)) continue
    result = baseMerge(
      result as unknown as Record<string | symbol, unknown>,
      src as unknown as Record<string | symbol, unknown>,
    ) as T
  }
  return result
}

function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}
