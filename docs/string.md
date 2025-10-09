# String Functions

Functions for working with strings and text. These utilities provide comprehensive string manipulation, formatting, and transformation capabilities.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`camelCase`](#camelcase) | Converts to camelCase | `string` | camelCase string |
| [`kebabCase`](#kebabcase) | Converts to kebab-case | `string` | kebab-case string |
| [`snakeCase`](#snakecase) | Converts to snake_case | `string` | snake_case string |
| [`startCase`](#startcase) | Converts to Start Case | `string` | Start Case string |
| [`capitalize`](#capitalize) | Capitalizes first letter | `string` | Capitalized string |
| [`upperFirst`](#upperfirst) | Uppercases first letter | `string` | Modified string |
| [`lowerFirst`](#lowerfirst) | Lowercases first letter | `string` | Modified string |
| [`lowerCase`](#lowercase) | Converts to lowercase | `string` | Lowercase string |
| [`upperCase`](#uppercase) | Converts to UPPERCASE | `string` | Uppercase string |
| [`truncate`](#truncate) | Truncates string | `string`, `options?` | Truncated string |
| [`pad`](#pad) | Pads string | `string`, `length?`, `chars?` | Padded string |
| [`words`](#words) | Splits into words | `string`, `pattern?` | Array of words |
| [`deburr`](#deburr) | Removes diacritical marks | `string` | Deburred string |
| [`escape`](#escape) | Escapes HTML entities | `string` | Escaped string |
| [`escapeRegExp`](#escaperegexp) | Escapes RegExp special chars | `string` | Escaped string |
| [`unescape`](#unescape) | Unescapes HTML entities | `string` | Unescaped string |
| [`template`](#template) | Creates template function | `string`, `options?` | Template function |

---

## Case Conversion Functions

### `camelCase(string)`

Converts `string` to camel case.

```typescript
import { camelCase } from 'highdash';

console.log(camelCase('--foo-bar--')); // 'fooBar'
console.log(camelCase('fooBar')); // 'fooBar'
console.log(camelCase('__FOO_BAR__')); // 'fooBar'
console.log(camelCase('foo bar')); // 'fooBar'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'

// Real-world examples
console.log(camelCase('user-name')); // 'userName'
console.log(camelCase('first-name')); // 'firstName'
console.log(camelCase('last-name')); // 'lastName'
```

### `kebabCase(string)`

Converts `string` to kebab case.

```typescript
import { kebabCase } from 'highdash';

console.log(kebabCase('Foo Bar')); // 'foo-bar'
console.log(kebabCase('fooBar')); // 'foo-bar'
console.log(kebabCase('__FOO_BAR__')); // 'foo-bar'
console.log(kebabCase('foo_bar')); // 'foo-bar'

// Real-world examples
console.log(kebabCase('userName')); // 'user-name'
console.log(kebabCase('firstName')); // 'first-name'
console.log(kebabCase('lastName')); // 'last-name'
```

### `snakeCase(string)`

Converts `string` to snake case.

```typescript
import { snakeCase } from 'highdash';

console.log(snakeCase('Foo Bar')); // 'foo_bar'
console.log(snakeCase('fooBar')); // 'foo_bar'
console.log(snakeCase('--FOO-BAR--')); // 'foo_bar'
console.log(snakeCase('foo-bar')); // 'foo_bar'

// Real-world examples
console.log(snakeCase('userName')); // 'user_name'
console.log(snakeCase('firstName')); // 'first_name'
console.log(snakeCase('lastName')); // 'last_name'
```

### `startCase(string)`

Converts `string` to start case.

```typescript
import { startCase } from 'highdash';

console.log(startCase('--foo-bar--')); // 'Foo Bar'
console.log(startCase('fooBar')); // 'Foo Bar'
console.log(startCase('__FOO_BAR__')); // 'Foo Bar'
console.log(startCase('foo_bar')); // 'Foo Bar'

// Real-world examples
console.log(startCase('userName')); // 'User Name'
console.log(startCase('firstName')); // 'First Name'
console.log(startCase('lastName')); // 'Last Name'
```

### `capitalize(string)`

Converts the first character of `string` to upper case and the remaining to lower case.

```typescript
import { capitalize } from 'highdash';

console.log(capitalize('FRED')); // 'Fred'
console.log(capitalize('fred')); // 'Fred'
console.log(capitalize('FRED')); // 'Fred'
console.log(capitalize('')); // ''

// Real-world examples
console.log(capitalize('hello world')); // 'Hello world'
console.log(capitalize('JOHN DOE')); // 'John doe'
```

### `upperFirst(string)`

Converts the first character of `string` to upper case.

```typescript
import { upperFirst } from 'highdash';

console.log(upperFirst('fred')); // 'Fred'
console.log(upperFirst('FRED')); // 'FRED'
console.log(upperFirst('')); // ''

// Real-world examples
console.log(upperFirst('hello world')); // 'Hello world'
console.log(upperFirst('john doe')); // 'John doe'
```

### `lowerFirst(string)`

Converts the first character of `string` to lower case.

```typescript
import { lowerFirst } from 'highdash';

console.log(lowerFirst('Fred')); // 'fred'
console.log(lowerFirst('FRED')); // 'fRED'
console.log(lowerFirst('')); // ''

// Real-world examples
console.log(lowerFirst('Hello World')); // 'hello World'
console.log(lowerFirst('JOHN DOE')); // 'jOHN DOE'
```

### `lowerCase(string)`

Converts `string` to lower case.

```typescript
import { lowerCase } from 'highdash';

console.log(lowerCase('--Foo-Bar--')); // 'foo bar'
console.log(lowerCase('fooBar')); // 'foo bar'
console.log(lowerCase('__FOO_BAR__')); // 'foo bar'

// Real-world examples
console.log(lowerCase('Hello World')); // 'hello world'
console.log(lowerCase('JOHN DOE')); // 'john doe'
```

### `upperCase(string)`

Converts `string` to upper case.

```typescript
import { upperCase } from 'highdash';

console.log(upperCase('--foo-bar--')); // 'FOO BAR'
console.log(upperCase('fooBar')); // 'FOO BAR'
console.log(upperCase('__foo_bar__')); // 'FOO BAR'

// Real-world examples
console.log(upperCase('hello world')); // 'HELLO WORLD'
console.log(upperCase('john doe')); // 'JOHN DOE'
```

---

## String Manipulation Functions

### `truncate(string, options?)`

Truncates `string` if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string.

```typescript
import { truncate } from 'highdash';

console.log(truncate('hi-diddly-ho there, neighborino'));
// => 'hi-diddly-ho there, neighbo...'

console.log(truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' }));
// => 'hi-diddly-ho there,...'

console.log(truncate('hi-diddly-ho there, neighborino', { 
  length: 24, 
  omission: ' [...]' 
}));
// => 'hi-diddly-ho there, ne [...]'

// Real-world examples
const longText = 'This is a very long text that needs to be truncated for display purposes';
console.log(truncate(longText, { length: 50 }));
// => 'This is a very long text that needs to be trun...'

console.log(truncate(longText, { length: 50, separator: ' ' }));
// => 'This is a very long text that needs to be...'
```

### `pad(string, length?, chars?)`

Pads `string` on the left and right sides if it's shorter than `length`. Padding characters are truncated if they can't be evenly divided by the padding length.

```typescript
import { pad } from 'highdash';

console.log(pad('abc', 8)); // '  abc   '
console.log(pad('abc', 8, '_-')); // '_-abc_-_'
console.log(pad('abc', 3)); // 'abc'

// Real-world examples
console.log(pad('123', 6, '0')); // '000123'
console.log(pad('hello', 10, ' ')); // '  hello   '
```

### `words(string, pattern?)`

Splits `string` into an array of its words.

```typescript
import { words } from 'highdash';

console.log(words('fred, barney, & pebbles')); // ['fred', 'barney', 'pebbles']
console.log(words('fred, barney, & pebbles', /[^, ]+/g)); // ['fred', 'barney', '&', 'pebbles']

// Real-world examples
console.log(words('hello world')); // ['hello', 'world']
console.log(words('camelCase')); // ['camel', 'Case']
console.log(words('snake_case')); // ['snake', 'case']
```

---

## String Processing Functions

### `deburr(string)`

Deburrs `string` by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.

```typescript
import { deburr } from 'highdash';

console.log(deburr('déjà vu')); // 'deja vu'
console.log(deburr('café')); // 'cafe'
console.log(deburr('naïve')); // 'naive'

// Real-world examples
console.log(deburr('résumé')); // 'resume'
console.log(deburr('piñata')); // 'pinata'
console.log(deburr('jalapeño')); // 'jalapeno'
```

### `escape(string)`

Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their corresponding HTML entities.

```typescript
import { escape } from 'highdash';

console.log(escape('fred, barney, & pebbles')); // 'fred, barney, &amp; pebbles'
console.log(escape('<div>Hello & "World"</div>')); // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'

// Real-world examples
console.log(escape('Tom & Jerry')); // 'Tom &amp; Jerry'
console.log(escape('He said "Hello"')); // 'He said &quot;Hello&quot;'
console.log(escape('<script>alert("xss")</script>')); // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

### `escapeRegExp(string)`

Escapes the `RegExp` special characters in `string`.

```typescript
import { escapeRegExp } from 'highdash';

console.log(escapeRegExp('[lodash](https://lodash.com/)')); // '\\[lodash\\]\\(https://lodash\\.com/\\)'

// Real-world examples
console.log(escapeRegExp('hello.world')); // 'hello\\.world'
console.log(escapeRegExp('test*string')); // 'test\\*string'
console.log(escapeRegExp('(test)')); // '\\(test\\)'
```

### `unescape(string)`

Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their corresponding characters.

```typescript
import { unescape } from 'highdash';

console.log(unescape('fred, barney, &amp; pebbles')); // 'fred, barney, & pebbles'
console.log(unescape('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;')); // '<div>Hello & "World"</div>'

// Real-world examples
console.log(unescape('Tom &amp; Jerry')); // 'Tom & Jerry'
console.log(unescape('He said &quot;Hello&quot;')); // 'He said "Hello"'
console.log(unescape('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')); // '<script>alert("xss")</script>'
```

---

## Template Functions

### `template(string, options?)`

Creates a compiled template function that can interpolate data properties in "interpolate" delimiters, HTML-escape interpolated data properties in "escape" delimiters, and execute JavaScript in "evaluate" delimiters.

```typescript
import { template } from 'highdash';

// Basic interpolation
const compiled = template('hello <%= user %>!');
console.log(compiled({ 'user': 'fred' })); // 'hello fred!'

// HTML escaping
const compiled2 = template('<%= a %> & <%= b %>');
console.log(compiled2({ 'a': '1', 'b': '2' })); // '1 & 2'

// JavaScript evaluation
const compiled3 = template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
console.log(compiled3({ 'users': ['fred', 'barney'] })); // '<li>fred</li><li>barney</li>'

// Real-world examples
const userTemplate = template(`
  <div class="user">
    <h2><%= name %></h2>
    <p>Email: <%= email %></p>
    <p>Age: <%= age %></p>
  </div>
`);

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

console.log(userTemplate(userData));
// => <div class="user">
//      <h2>John Doe</h2>
//      <p>Email: john@example.com</p>
//      <p>Age: 30</p>
//    </div>
```

---

## Import Examples

```typescript
// Import specific functions
import { camelCase, capitalize, truncate } from 'highdash';

// Import from specific module (better tree-shaking)
import { camelCase } from 'highdash/string/camelCase.js';
import { capitalize } from 'highdash/string/capitalize.js';
import { truncate } from 'highdash/string/truncate.js';

// Import all string functions
import * as string from 'highdash/string';
```

## Performance Notes

- **Case conversion**: Optimized regex patterns for efficient conversion
- **String manipulation**: Uses native string methods where possible
- **Memory usage**: Minimal memory overhead for string operations
- **Type safety**: Full TypeScript support with proper type inference

## Common Use Cases

- **Case conversion**: Use `camelCase`, `kebabCase`, `snakeCase` for naming conventions
- **Text formatting**: Use `capitalize`, `upperFirst`, `lowerFirst` for text display
- **Text truncation**: Use `truncate` for UI text limits
- **String processing**: Use `deburr`, `escape`, `unescape` for text cleaning
- **Template rendering**: Use `template` for dynamic string generation
- **Word extraction**: Use `words` for text analysis
- **String padding**: Use `pad` for formatting and alignment
