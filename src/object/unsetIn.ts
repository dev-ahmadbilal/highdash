/**
 * Removes the property at `path` of `object`. Returns a new object without the property.
 *
 * @param object - The object to modify
 * @param path - The path of the property to unset
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 7 } }] };
 * unsetIn(object, 'a[0].b.c');
 * // => { 'a': [{ 'b': {} }] }
 *
 * unsetIn(object, ['a', '0', 'b', 'c']);
 * // => { 'a': [{ 'b': {} }] }
 * ```
 */
export function unsetIn<T extends Record<string, unknown>>(object: T, path: string | string[]): T {
  if (!object || typeof object !== 'object') {
    return object
  }

  let keys: string[]
  if (Array.isArray(path)) {
    keys = path
  } else {
    if (path === '') {
      return object
    }
    // eslint-disable-next-line no-useless-escape
    keys = path.split(/[.[\]]+/).filter(Boolean)
  }

  if (keys.length === 0) {
    return object
  }

  function cloneShallow(obj: any): any {
    return Array.isArray(obj) ? obj.slice() : { ...obj }
  }

  const result: any = cloneShallow(object)
  let cur: any = result
  let src: any = object

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    // eslint-disable-next-line eqeqeq
    const srcNext = src != null ? (src as any)[k] : undefined
    const cloned = cloneShallow(srcNext ?? {})
    cur[k] = cloned
    cur = cloned
    src = srcNext
  }

  const last = keys[keys.length - 1]
  if (Array.isArray(cur)) {
    ;(cur as any).splice(Number(last), 1)
  } else {
    delete cur[last]
  }

  return result as T
}
