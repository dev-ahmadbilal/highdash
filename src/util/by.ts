export type Order = 'asc' | 'desc'
export interface CompareOptions {
  order?: Order
  nulls?: 'first' | 'last'
  collator?: Intl.Collator
}

function defaultCompare(a: unknown, b: unknown, opts: CompareOptions): number {
  const { order = 'asc', nulls = 'last', collator } = opts
  const dir = order === 'asc' ? 1 : -1
  const aU = a === undefined || a === null
  const bU = b === undefined || b === null
  if (aU || bU) {
    if (aU && bU) return 0
    return (nulls === 'first' ? -1 : 1) * (aU ? 1 : -1) * dir
  }
  if (typeof a === 'string' && typeof b === 'string' && collator) {
    return collator.compare(a, b) * dir
  }
  // Fallback numeric/lexicographic
  return ((a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0) * dir
}

export function by<T>(selector: ((x: T) => unknown) | string, options: CompareOptions = {}): (a: T, b: T) => number {
  const get = typeof selector === 'function' ? selector : (obj: T) => (obj as any)?.[selector as string]
  return (a: T, b: T) => defaultCompare(get(a), get(b), options)
}

export function thenBy<T>(
  prev: (a: T, b: T) => number,
  selector: ((x: T) => unknown) | string,
  options: CompareOptions = {},
): (a: T, b: T) => number {
  const next = by(selector, options)
  return (a: T, b: T) => {
    const r = prev(a, b)
    return r !== 0 ? r : next(a, b)
  }
}
/**
 * @example
 * const cmp = thenBy(by('lastName'), 'firstName');
 * users.sort(cmp);
 */
