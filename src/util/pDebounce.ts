/**
 * Promise-aware debounce. Collects calls within the wait window and resolves all callers
 * with the result of the last invocation.
 *
 * - Trailing by default; supports leading/trailing
 * - All pending callers receive the same resolved/rejected value
 *
 * @example
 * const fn = async (x: number) => x * 2;
 * const debounced = pDebounce(fn, 100);
 * const [a, b] = await Promise.all([debounced(1), debounced(2)]);
 * // a === 4, b === 4
 */
export function pDebounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: { leading?: boolean; trailing?: boolean } = {},
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  const { leading = false, trailing = true } = options
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<T> | undefined
  let lastThis: unknown
  const pendingResolvers: ((value: any) => void)[] = []
  const pendingRejecters: ((reason?: any) => void)[] = []
  let invoked = false

  function invoke(timeArgs: Parameters<T>, timeThis: unknown): void {
    try {
      const result = fn.apply(timeThis, timeArgs)
      Promise.resolve(result).then(
        (value) => {
          const resolvers = pendingResolvers.slice()
          pendingResolvers.length = 0
          pendingRejecters.length = 0
          for (const resolve of resolvers) resolve(value)
        },
        (err) => {
          const rejecters = pendingRejecters.slice()
          pendingResolvers.length = 0
          pendingRejecters.length = 0
          for (const reject of rejecters) reject(err)
        },
      )
    } catch (err) {
      const rejecters = pendingRejecters.slice()
      pendingResolvers.length = 0
      pendingRejecters.length = 0
      for (const reject of rejecters) reject(err)
    }
  }

  function schedule(): void {
    if (timer !== undefined) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      if (trailing && lastArgs) {
        const args = lastArgs
        const ctx = lastThis
        lastArgs = undefined
        lastThis = undefined
        invoke(args, ctx)
      } else {
        // If nothing to invoke, resolve pending with undefined
        const resolvers = pendingResolvers.slice()
        pendingResolvers.length = 0
        pendingRejecters.length = 0
        for (const resolve of resolvers) resolve(undefined)
      }
    }, wait)
  }

  return function debounced(this: unknown, ...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    const promise = new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      pendingResolvers.push(resolve)
      pendingRejecters.push(reject)
    })

    const shouldInvokeLeading = leading && !invoked
    if (shouldInvokeLeading) {
      invoked = true
      invoke(args, this)
    }
    schedule()
    return promise
  }
}
