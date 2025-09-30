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
export function bindAll<T extends Record<string, unknown>>(object: T, methodNames: (keyof T)[]): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  for (const methodName of methodNames) {
    const method = object[methodName];
    if (typeof method === 'function') {
      object[methodName] = (method as Function).bind(object) as T[keyof T];
    }
  }

  return object;
}
