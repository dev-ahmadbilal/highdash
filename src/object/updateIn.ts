/**
 * Updates the value at `path` of `object` using an updater function. If a portion of `path` doesn't exist, it's created.
 * Arrays are created for missing index properties, objects are created for all other missing properties.
 *
 * @param object - The object to modify
 * @param path - The path of the property to update
 * @param updater - The function to produce the updated value
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * updateIn(object, 'a[0].b.c', (n) => (n as number) * 2);
 * // => { 'a': [{ 'b': { 'c': 6 } }] }
 *
 * updateIn(object, ['x', '0', 'y', 'z'], (val) => val || 5);
 * // => { 'a': [{ 'b': { 'c': 6 } }], 'x': [{ 'y': { 'z': 5 } }] }
 * ```
 */
export function updateIn<T extends Record<string, unknown>, R = unknown>(
  object: T,
  path: string | string[],
  updater: (current: unknown, path: string, obj: T) => R,
): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  let keys: string[];
  if (Array.isArray(path)) {
    keys = path;
  } else {
    if (path === '') {
      return updater(object, '', object) as T;
    }
    // eslint-disable-next-line no-useless-escape
    keys = path.split(/[\.\[\]]+/).filter(Boolean);
  }

  if (keys.length === 0) {
    return updater(object, '', object) as T;
  }

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
  cur[last] = updater(prev, path as string, object);
  return result as T;
}
