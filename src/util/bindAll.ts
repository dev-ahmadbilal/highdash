/**
 * Binds methods of an object to the object itself, overwriting the existing method.
 *
 * @param object - The object to bind and assign the bound methods to
 * @param methodNames - The object method names to bind
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * bindAll(view, ['click']);
 * const click = view.click;
 * click();
 * // => 'clicked docs'
 * ```
 */
export function bindAll<T extends Record<string, any>>(object: T, ...methodNames: string[]): T {
  if (object === null || object === undefined || typeof object !== 'object') {
    // Mirror lodash behavior: return input as-is for non-objects
    return object as T;
  }

  const bindAtPath = (path: string) => {
    const parts = path.split('.');
    let ctx: any = object;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (ctx === null || typeof ctx !== 'object') return; // nothing to bind
      ctx = ctx[p];
    }
    const last = parts[parts.length - 1];
    if (!last) return;
    const fn = ctx?.[last];
    if (typeof fn === 'function') {
      ctx[last] = (fn as Function).bind(object);
    }
  };

  if (methodNames.length === 0) {
    // Bind all own enumerable function properties on the root object
    for (const key of Object.keys(object)) {
      const value = (object as any)[key];
      if (typeof value === 'function') {
        (object as any)[key] = (value as Function).bind(object);
      }
    }
    return object;
  }

  for (const name of methodNames) {
    bindAtPath(String(name));
  }

  return object;
}
