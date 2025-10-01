/**
 * Immutable set at deep path. Creates missing containers (array/object) based on the next key.
 *
 * @example
 * setIn({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4) // { a: [{ b: { c: 4 } }] }
 */
export function setIn<T extends Record<string, unknown>>(object: T, path: string | string[], value: unknown): T {
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
    // eslint-disable-next-line eqeqeq
    const srcNext = src != null ? (src as any)[k] : undefined;
    // eslint-disable-next-line eqeqeq
    const next = srcNext != null ? srcNext : nextIsIndex ? [] : {};
    const cloned = cloneShallow(next);
    cur[k] = cloned;
    cur = cloned;
    src = srcNext;
  }
  const last = keys[keys.length - 1];
  cur[last] = value;
  return result as T;
}
