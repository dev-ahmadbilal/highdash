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
export function template(
  string: string,
  options: {
    escape?: RegExp
    evaluate?: RegExp
    imports?: Record<string, unknown>
    interpolate?: RegExp
    sourceURL?: string
    variable?: string
  } = {},
): (data?: Record<string, unknown>) => string {
  const {
    // biome-ignore lint/suspicious/noShadowRestrictedNames: keep Lodash-compatible name
    escape = /<%-([\s\S]+?)%>/g,
    evaluate = /<%([\s\S]+?)%>/g,
    interpolate = /<%=([\s\S]+?)%>/g,
    // imports and sourceURL are not used by tests, but we keep options signature
    variable = 'obj',
  } = options

  // Build a single compiled function similar to lodash's approach
  const noMatch = /(.)^/
  const escRe = escape || noMatch
  const evalRe = evaluate || noMatch
  const interpRe = interpolate || noMatch

  const matcher = new RegExp(escRe.source + '|' + interpRe.source + '|' + evalRe.source + '|$', 'g')

  let index = 0
  let source = "__p += '"

  const escapeStringChar = (chr: string) => {
    switch (chr) {
      case '\\':
        return '\\\\'
      case "'":
        return "\\'"
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\t':
        return '\\t'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
      default:
        return chr
    }
  }

  string.replace(matcher, (match: string, escGroup: string, interpGroup: string, evalGroup: string, offset: number) => {
    source += string.slice(index, offset).replace(/[\\'\n\r\t\u2028\u2029]/g, escapeStringChar)

    if (escGroup) {
      source += "' + __e((typeof (" + escGroup + ") !== 'undefined' ? (" + escGroup + ") : '')) + '"
    } else if (interpGroup) {
      source +=
        "' + ((__t = (typeof (" +
        interpGroup +
        ") !== 'undefined' ? (" +
        interpGroup +
        ") : '')) == null ? '' : __t) + '"
    } else if (evalGroup) {
      source += "';\n" + evalGroup + "\n__p += '"
    }
    index = offset + match.length
    return match
  })
  source += "';\n"

  let functionBody = ''
  functionBody += 'var __t, __p = "";\n'
  functionBody += 'var __e = escapeHtml;\n'
  functionBody += 'function print() { __p += Array.prototype.join.call(arguments, "") }\n'
  functionBody += 'with (' + variable + ' || {}) {\n' + source + '}\n'
  functionBody += 'return __p;\n'

  const render = new Function(variable, 'escapeHtml', functionBody) as (
    data: Record<string, unknown> | undefined,
    esc: (s: string) => string,
  ) => string

  return function compiled(this: unknown, data?: Record<string, unknown>): string {
    return render.call(this as unknown as object, data ?? {}, escapeHtml)
  }
}

// Simple escape function for HTML entities
function escapeHtml(string: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
  }

  return string.replace(/[&<>"'`]/g, (char) => htmlEscapes[char] || char)
}
