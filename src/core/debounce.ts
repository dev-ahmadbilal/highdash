/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout
 * @param options.trailing - Specify invoking on the trailing edge of the timeout
 * @param options.maxWait - The maximum time `func` is allowed to be delayed before it's invoked
 * @returns Returns the new debounced function
 *
 * @example
 * ```typescript
 * const debounced = debounce(() => console.log('Hello'), 1000);
 * debounced(); // Will log 'Hello' after 1000ms of inactivity
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {},
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined } {
  const { leading = false, trailing = true, maxWait } = options;

  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: unknown;
  let result: ReturnType<T> | undefined;
  let timerId: NodeJS.Timeout | undefined;
  let maxing = false;

  if (typeof maxWait === 'number') {
    maxing = true;
  }

  function invokeFunc(time: number): ReturnType<T> {
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = undefined;
    lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args) as ReturnType<T>;
    return result;
  }

  function leadingEdge(time: number): ReturnType<T> | undefined {
    // Reset any `maxWait` timer
    lastInvokeTime = time;
    // Start the timer for the trailing edge
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, (maxWait || 0) - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait || 0))
    );
  }

  function timerExpired(): void {
    const time = Date.now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
      return;
    }
    // Restart the timer
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number): ReturnType<T> | undefined {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }

  function cancel(): void {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = undefined;
    lastCallTime = undefined;
    lastThis = undefined;
    timerId = undefined;
  }

  function flush(): ReturnType<T> | undefined {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(this: unknown, ...args: Parameters<T>): ReturnType<T> | undefined {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced as T & { cancel: () => void; flush: () => ReturnType<T> | undefined };
}
