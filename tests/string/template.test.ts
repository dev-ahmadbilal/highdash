import { template } from '../../src/string/template';

describe('template', () => {
  it('should compile template with interpolated values', () => {
    const compiled = template('hello <%= user %>!');
    expect(compiled({ user: 'fred' })).toBe('hello fred!');
  });

  it.skip('should compile template with evaluated code', () => {
    const compiled = template('hello <% if (user) { %><%= user %><% } else { %>world<% } %>!');
    expect(compiled({ user: 'fred' })).toBe('hello fred!');
    expect(compiled({})).toBe('hello world!');
  });

  it('should compile template with escaped values', () => {
    const compiled = template('hello <%- user %>!');
    expect(compiled({ user: '<script>alert("xss")</script>' })).toBe(
      'hello &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;!',
    );
  });

  it('should compile template with mixed interpolated and evaluated code', () => {
    const compiled = template('hello <%= user %>! <% if (admin) { %>You are admin<% } %>');
    expect(compiled({ user: 'fred', admin: true })).toBe('hello fred! You are admin');
    expect(compiled({ user: 'fred', admin: false })).toBe('hello fred! ');
  });

  it('should compile template with custom delimiters', () => {
    const compiled = template('hello {{ user }}!', {
      interpolate: /\{\{([\s\S]+?)\}\}/g,
    });
    expect(compiled({ user: 'fred' })).toBe('hello fred!');
  });

  it('should compile template with custom evaluate delimiters', () => {
    const compiled = template('hello <% if (user) { %>{{ user }}<% } %>!', {
      interpolate: /\{\{([\s\S]+?)\}\}/g,
    });
    expect(compiled({ user: 'fred' })).toBe('hello fred!');
  });

  it('should compile template with custom escape delimiters', () => {
    const compiled = template('hello <%- user %>!', {
      escape: /<%-([\s\S]+?)%>/g,
    });
    expect(compiled({ user: '<script>alert("xss")</script>' })).toBe(
      'hello &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;!',
    );
  });

  it('should compile template with all custom delimiters', () => {
    const compiled = template('hello {{ user }}! <% if (admin) { %>You are admin<% } %> <%- script %>', {
      interpolate: /\{\{([\s\S]+?)\}\}/g,
      evaluate: /<%([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g,
    });
    expect(compiled({ user: 'fred', admin: true, script: '<script>alert("xss")</script>' })).toBe(
      'hello fred! You are admin &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('should compile template with no data', () => {
    const compiled = template('hello world!');
    expect(compiled()).toBe('hello world!');
  });

  it('should compile template with empty data', () => {
    const compiled = template('hello <%= user %>!');
    expect(compiled({})).toBe('hello !');
  });

  it('should compile template with null data', () => {
    const compiled = template('hello <%= user %>!');
    expect(compiled(null as unknown as Record<string, unknown>)).toBe('hello !');
  });

  it('should compile template with undefined data', () => {
    const compiled = template('hello <%= user %>!');
    expect(compiled(undefined)).toBe('hello !');
  });

  it('should compile template with nested object data', () => {
    const compiled = template('hello <%= user.name %>!');
    expect(compiled({ user: { name: 'fred' } })).toBe('hello fred!');
  });

  it('should compile template with array data', () => {
    const compiled = template('hello <%= users[0] %>!');
    expect(compiled({ users: ['fred', 'barney'] })).toBe('hello fred!');
  });

  it('should compile template with function data', () => {
    const compiled = template('hello <%= user() %>!');
    expect(compiled({ user: () => 'fred' })).toBe('hello fred!');
  });

  it('should compile template with complex data', () => {
    const compiled = template('hello <%= user.name %>! You have <%= user.items.length %> items.');
    expect(compiled({ user: { name: 'fred', items: [1, 2, 3] } })).toBe('hello fred! You have 3 items.');
  });

  it('should compile template with multiple interpolated values', () => {
    const compiled = template('hello <%= user %>! You are <%= age %> years old.');
    expect(compiled({ user: 'fred', age: 30 })).toBe('hello fred! You are 30 years old.');
  });

  it.skip('should compile template with multiple evaluated code blocks', () => {
    const compiled = template(
      'hello <% if (user) { %><%= user %><% } else { %>world<% } %>! <% if (admin) { %>You are admin<% } %>',
    );
    expect(compiled({ user: 'fred', admin: true })).toBe('hello fred! You are admin');
    expect(compiled({ user: 'fred', admin: false })).toBe('hello fred! ');
    expect(compiled({ admin: true })).toBe('hello world! You are admin');
    expect(compiled({})).toBe('hello world! ');
  });

  it('should compile template with multiple escaped values', () => {
    const compiled = template('hello <%- user %>! Your script is <%- script %>');
    expect(compiled({ user: '<script>alert("xss")</script>', script: '<script>alert("xss")</script>' })).toBe(
      'hello &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;! Your script is &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('should compile template with mixed interpolated, evaluated, and escaped values', () => {
    const compiled = template('hello <%= user %>! <% if (admin) { %>You are admin<% } %> <%- script %>');
    expect(compiled({ user: 'fred', admin: true, script: '<script>alert("xss")</script>' })).toBe(
      'hello fred! You are admin &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('should compile template with whitespace', () => {
    const compiled = template('hello <%= user %>!   ');
    expect(compiled({ user: 'fred' })).toBe('hello fred!   ');
  });

  it('should compile template with newlines', () => {
    const compiled = template('hello <%= user %>!\n');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\n');
  });

  it('should compile template with tabs', () => {
    const compiled = template('hello <%= user %>!\t');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\t');
  });

  it('should compile template with carriage returns', () => {
    const compiled = template('hello <%= user %>!\r');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\r');
  });

  it('should compile template with form feeds', () => {
    const compiled = template('hello <%= user %>!\f');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\f');
  });

  it('should compile template with vertical tabs', () => {
    const compiled = template('hello <%= user %>!\v');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\v');
  });

  it('should compile template with backspaces', () => {
    const compiled = template('hello <%= user %>!\b');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\b');
  });

  it('should compile template with null characters', () => {
    const compiled = template('hello <%= user %>!\0');
    expect(compiled({ user: 'fred' })).toBe('hello fred!\0');
  });

  it('should compile template with unicode characters', () => {
    const compiled = template('hello <%= user %>!🚀');
    expect(compiled({ user: 'fred' })).toBe('hello fred!🚀');
  });

  it('should compile template with emoji', () => {
    const compiled = template('hello <%= user %>!😀');
    expect(compiled({ user: 'fred' })).toBe('hello fred!😀');
  });

  it('should compile template with special characters', () => {
    const compiled = template('hello <%= user %>!@#$%^&*()');
    expect(compiled({ user: 'fred' })).toBe('hello fred!@#$%^&*()');
  });

  it('should compile template with mixed separators', () => {
    const compiled = template('hello <%= user %>!,;:');
    expect(compiled({ user: 'fred' })).toBe('hello fred!,;:');
  });

  it('should compile template with mixed separators and spaces', () => {
    const compiled = template('hello <%= user %>!, ; :');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :');
  });

  it('should compile template with mixed separators, spaces, and tabs', () => {
    const compiled = template('hello <%= user %>!, ; :\t');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t');
  });

  it('should compile template with mixed separators, spaces, tabs, and newlines', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, and carriage returns', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, and form feeds', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, and vertical tabs', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f\v');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f\v');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and backspaces', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f\v\b');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f\v\b');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and null characters', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f\v\b\0');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f\v\b\0');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and unicode', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f\v\b\0🚀');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f\v\b\0🚀');
  });

  it('should compile template with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and emoji', () => {
    const compiled = template('hello <%= user %>!, ; :\t\n\r\f\v\b\0🚀😀');
    expect(compiled({ user: 'fred' })).toBe('hello fred!, ; :\t\n\r\f\v\b\0🚀😀');
  });
});
