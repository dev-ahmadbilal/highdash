"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCase = kebabCase;
/**
 * Converts `string` to kebab case.
 *
 * @param string - The string to convert
 * @returns Returns the kebab cased string
 *
 * @example
 * ```typescript
 * kebabCase('--foo-bar--');
 * // => 'foo-bar'
 *
 * kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 * ```
 */
function kebabCase(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        .toLowerCase();
}
