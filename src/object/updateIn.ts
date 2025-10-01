/**
 * Immutable update at deep path with updater(value) -> newValue. Creates path as needed.
 *
 * @example
 * updateIn({ a: [ { b: 1 } ] }, 'a[0].b', (v) => (v as number) + 1) // { a: [ { b: 2 } ] }
 */
export function updateIn<T extends Record<string, unknown>, R = unknown>(
  object: T,
  path: string | string[],
  updater: (current: unknown) => R,
): T {
  const keys = Array.isArray(path)
    ? path.slice()
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);
  if (!object || typeof object !== 'object' || keys.length === 0) return object;

  function cloneShallow(obj: any): any {
    return Array.isArray(obj) ? obj.slice() : { ...obj };
  }

  const result: any = cloneShallow(object);
  let cur: any = result;
  let src: any = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const nk = keys[i + 1];
    const nextIsIndex = /^\d+$/.test(nk);
    const srcNext = src !== null && src !== undefined ? (src as any)[k] : undefined;
    const next = srcNext !== null && srcNext !== undefined ? srcNext : nextIsIndex ? [] : {};
    const cloned = cloneShallow(next);
    cur[k] = cloned;
    cur = cloned;
    src = srcNext;
  }
  const last = keys[keys.length - 1];
  const prev = src !== null && src !== undefined ? src[last] : undefined;
  cur[last] = updater(prev);
  return result as T;
}
