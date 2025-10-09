"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = template;
/**
 * Creates a compiled template function that can interpolate data properties in "interpolate" delimiters, HTML-escape interpolated data properties in "escape" delimiters, and execute JavaScript in "evaluate" delimiters.
 *
 * @param string - The template string
 * @param options - The options object
 * @returns Returns the compiled template function
 *
 * @example
 * ```typescript
 * const compiled = template('hello <%= user %>!');
 * compiled({ 'user': 'fred' });
 * // => 'hello fred!'
 * ```
 */
function template(string, options = {}) {
    const { 
    // biome-ignore lint/suspicious/noShadowRestrictedNames: keep Lodash-compatible name
    escape = /<%-([\s\S]+?)%>/g, evaluate = /<%([\s\S]+?)%>/g, interpolate = /<%=([\s\S]+?)%>/g, 
    // imports and sourceURL are not used by tests, but we keep options signature
    variable = 'obj', } = options;
    // Build a single compiled function similar to lodash's approach
    const noMatch = /(.)^/;
    const escRe = escape || noMatch;
    const evalRe = evaluate || noMatch;
    const interpRe = interpolate || noMatch;
    const matcher = new RegExp(escRe.source + '|' + interpRe.source + '|' + evalRe.source + '|$', 'g');
    let index = 0;
    let source = "__p += '";
    const escapeStringChar = (chr) => {
        switch (chr) {
            case '\\':
                return '\\\\';
            case "'":
                return "\\'";
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
            default:
                return chr;
        }
    };
    string.replace(matcher, (match, escGroup, interpGroup, evalGroup, offset) => {
        source += string.slice(index, offset).replace(/[\\'\n\r\t\u2028\u2029]/g, escapeStringChar);
        if (escGroup) {
            source += "' + __e((typeof (" + escGroup + ") !== 'undefined' ? (" + escGroup + ") : '')) + '";
        }
        else if (interpGroup) {
            source +=
                "' + ((__t = (typeof (" +
                    interpGroup +
                    ") !== 'undefined' ? (" +
                    interpGroup +
                    ") : '')) == null ? '' : __t) + '";
        }
        else if (evalGroup) {
            source += "';\n" + evalGroup + "\n__p += '";
        }
        index = offset + match.length;
        return match;
    });
    source += "';\n";
    let functionBody = '';
    functionBody += 'var __t, __p = "";\n';
    functionBody += 'var __e = escapeHtml;\n';
    functionBody += 'function print() { __p += Array.prototype.join.call(arguments, "") }\n';
    functionBody += 'with (' + variable + ' || {}) {\n' + source + '}\n';
    functionBody += 'return __p;\n';
    const render = new Function(variable, 'escapeHtml', functionBody);
    return function compiled(data) {
        return render.call(this, data !== null && data !== void 0 ? data : {}, escapeHtml);
    };
}
// Simple escape function for HTML entities
function escapeHtml(string) {
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
    };
    return string.replace(/[&<>"'`]/g, (char) => htmlEscapes[char] || char);
}
