/**
 * This method is like `cloneDeep` except that it accepts `customizer`
 * which is invoked to produce the cloned value. If `customizer` returns
 * `undefined`, cloning is handled by the method instead. The `customizer`
 * is invoked with up to four arguments: (value, key, object, stack).
 *
 * The implementation mirrors `cloneDeep` behavior for built-in types and
 * supports circular references via a stack map.
 */
export function cloneDeepWith<T>(
  value: T,
  customizer?: (
    value: unknown,
    key: string | number | symbol | undefined,
    object: unknown,
    stack: Map<any, any>,
  ) => unknown,
): T {
  const stack = new Map<any, any>()

  function baseCloneDeepWith<V>(input: V, key: string | number | symbol | undefined, parent: unknown): V {
    if (customizer) {
      const customized = customizer(input as unknown, key, parent, stack)
      if (customized !== undefined) {
        return customized as V
      }
    }

    if (input === null || typeof input !== 'object') {
      return input as V
    }

    if (stack.has(input as any)) {
      return stack.get(input as any) as V
    }

    if (input instanceof Date) {
      return new Date(input.getTime()) as unknown as V
    }

    if (input instanceof RegExp) {
      return new RegExp(input.source, input.flags) as unknown as V
    }

    if (input instanceof Map) {
      const clonedMap = new Map()
      stack.set(input, clonedMap)
      for (const [k, v] of input) {
        clonedMap.set(baseCloneDeepWith(k, undefined, input), baseCloneDeepWith(v, undefined, input))
      }
      return clonedMap as unknown as V
    }

    if (input instanceof Set) {
      const clonedSet = new Set()
      stack.set(input, clonedSet)
      for (const v of input) {
        clonedSet.add(baseCloneDeepWith(v, undefined, input))
      }
      return clonedSet as unknown as V
    }

    if (Array.isArray(input)) {
      const arr: unknown[] = new Array(input.length)
      stack.set(input, arr)
      for (let i = 0; i < input.length; i++) {
        arr[i] = baseCloneDeepWith(input[i] as unknown, i, input)
      }
      return arr as unknown as V
    }

    if (input instanceof ArrayBuffer) {
      return input.slice(0) as unknown as V
    }

    if (input instanceof DataView) {
      const buffer = input.buffer.slice(0)
      return new DataView(buffer, input.byteOffset, input.byteLength) as unknown as V
    }

    if (ArrayBuffer.isView(input)) {
      if (input instanceof DataView) {
        const buffer = input.buffer.slice(0)
        return new DataView(buffer, input.byteOffset, input.byteLength) as unknown as V
      }
      return (input as any).slice(0) as V
    }

    // Plain object
    const cloned: Record<string | symbol, unknown> = {}
    stack.set(input, cloned)
    for (const k in input as Record<string, unknown>) {
      if (Object.hasOwn(input, k)) {
        cloned[k] = baseCloneDeepWith((input as Record<string, unknown>)[k], k, input)
      }
    }

    // Also copy symbol keys
    const symbols = Object.getOwnPropertySymbols(input as object)
    for (const sym of symbols) {
      const desc = Object.getOwnPropertyDescriptor(input as object, sym)
      if (desc && desc.enumerable) {
        cloned[sym] = baseCloneDeepWith((input as any)[sym], sym, input)
      }
    }

    return cloned as unknown as V
  }

  return baseCloneDeepWith(value, undefined, undefined)
}
