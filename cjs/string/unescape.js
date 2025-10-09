"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescape = unescape;
/**
 * The inverse of `escape`; this method converts the HTML entities "&amp;", "&lt;", "&gt;", "&quot;", "&#39;", and "&#96;" in `string` to their corresponding characters.
 *
 * @param string - The string to unescape
 * @returns Returns the unescaped string
 *
 * @example
 * ```typescript
 * unescape('fred, barney, &amp; pebbles');
 * // => 'fred, barney, & pebbles'
 * ```
 */
// biome-ignore lint/suspicious/noShadowRestrictedNames: keep Lodash-compatible name
function unescape(string) {
    if (typeof string !== 'string') {
        return '';
    }
    const htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#96;': '`',
    };
    return string.replace(/&(?:amp|lt|gt|quot|#39|#96);/g, (entity) => htmlUnescapes[entity] || entity);
}
