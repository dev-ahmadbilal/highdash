/**
 * Converts `string` to camel case.
 *
 * @param string - The string to convert
 * @returns Returns the camel cased string
 *
 * @example
 * ```typescript
 * camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * camelCase('fooBar');
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__');
 * // => 'fooBar'
 * ```
 */
export function camelCase(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  // Remove leading and trailing separators
  const result = string.replace(/^[-_\s]+|[-_\s]+$/g, '');

  // If the string doesn't contain separators, it might already be camelCase
  if (!/[-_\s]/.test(result)) {
    // If it's already camelCase (has lowercase followed by uppercase), return as is
    if (/[a-z][A-Z]/.test(result)) {
      return result;
    }
    // Otherwise, convert to lowercase
    return result.toLowerCase();
  }

  // Split by separators and convert to camelCase
  const words = result.split(/[-_\s]+/);
  if (words.length === 0) return '';

  // First word should be lowercase
  let camelCase = words[0].toLowerCase();

  // Subsequent words should have first letter capitalized
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      camelCase += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }

  return camelCase;
}
