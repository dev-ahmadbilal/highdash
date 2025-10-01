"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCase = startCase;
/**
 * Converts `string` to start case.
 *
 * @param string - The string to convert
 * @returns Returns the start cased string
 *
 * @example
 * ```typescript
 * startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * startCase('fooBar');
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 * ```
 */
function startCase(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[\s_-]+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter((word) => word.length > 0)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
