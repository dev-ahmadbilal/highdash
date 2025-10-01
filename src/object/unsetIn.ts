/**
 * Immutable unset at deep path. Removes key/index and returns a new object.
 *
 * @example
 * unsetIn({ a: [ { b: 1 }, { c: 2 } ] }, 'a[1].c') // { a: [ { b: 1 }, {} ] }
 */
export function unsetIn<T extends Record<string, unknown>>(object: T, path: string | string[]): T {
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
  const parents: any[] = [];
  const parentKeys: (string | number)[] = [];

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    // eslint-disable-next-line eqeqeq
    const srcNext = src != null ? (src as any)[k] : undefined;
    const cloned = cloneShallow(srcNext ?? {});
    cur[k] = cloned;
    parents.push(cur);
    parentKeys.push(k);
    cur = cloned;
    src = srcNext;
  }
  const last = keys[keys.length - 1];
  if (Array.isArray(cur)) {
    (cur as any).splice(Number(last), 1);
  } else {
    delete cur[last];
  }
  return result as T;
}
