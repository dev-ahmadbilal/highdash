import { words } from '../../src/string/words';

describe('words', () => {
  it('should split string into words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('should split camelCase into words', () => {
    expect(words('camelCase')).toEqual(['camel', 'Case']);
  });

  it('should split PascalCase into words', () => {
    expect(words('PascalCase')).toEqual(['Pascal', 'Case']);
  });

  it('should split kebab-case into words', () => {
    expect(words('kebab-case')).toEqual(['kebab', 'case']);
  });

  it('should split snake_case into words', () => {
    expect(words('snake_case')).toEqual(['snake', 'case']);
  });

  it('should split string with numbers into words', () => {
    expect(words('hello123world')).toEqual(['hello', 'world']);
  });

  it('should split string with special characters into words', () => {
    expect(words('hello@world#test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with spaces into words', () => {
    expect(words('hello world test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with multiple spaces into words', () => {
    expect(words('hello   world    test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with tabs into words', () => {
    expect(words('hello\tworld\ttest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with newlines into words', () => {
    expect(words('hello\nworld\ntest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with carriage returns into words', () => {
    expect(words('hello\rworld\rtest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with form feeds into words', () => {
    expect(words('hello\fworld\ftest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with vertical tabs into words', () => {
    expect(words('hello\vworld\vtest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with backspaces into words', () => {
    expect(words('hello\bworld\btest')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with null characters into words', () => {
    expect(words('hello\0world\0test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with unicode characters into words', () => {
    expect(words('hello🚀world😀test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with emoji into words', () => {
    expect(words('hello😀world🚀test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with special characters into words', () => {
    expect(words('hello!@#world$%^test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with mixed characters into words', () => {
    expect(words('hello123world456test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with underscores into words', () => {
    expect(words('hello_world_test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with hyphens into words', () => {
    expect(words('hello-world-test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with dots into words', () => {
    expect(words('hello.world.test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with commas into words', () => {
    expect(words('hello,world,test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with semicolons into words', () => {
    expect(words('hello;world;test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with colons into words', () => {
    expect(words('hello:world:test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with question marks into words', () => {
    expect(words('hello?world?test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with exclamation marks into words', () => {
    expect(words('hello!world!test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with parentheses into words', () => {
    expect(words('hello(world)test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with brackets into words', () => {
    expect(words('hello[world]test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with braces into words', () => {
    expect(words('hello{world}test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with angle brackets into words', () => {
    expect(words('hello<world>test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with quotes into words', () => {
    expect(words('hello"world"test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with single quotes into words', () => {
    expect(words("hello'world'test")).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with backticks into words', () => {
    expect(words('hello`world`test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with pipes into words', () => {
    expect(words('hello|world|test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with backslashes into words', () => {
    expect(words('hello\\world\\test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with forward slashes into words', () => {
    expect(words('hello/world/test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with equals signs into words', () => {
    expect(words('hello=world=test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with plus signs into words', () => {
    expect(words('hello+world+test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with minus signs into words', () => {
    expect(words('hello-world-test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with asterisks into words', () => {
    expect(words('hello*world*test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with ampersands into words', () => {
    expect(words('hello&world&test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with tildes into words', () => {
    expect(words('hello~world~test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with carets into words', () => {
    expect(words('hello^world^test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with percent signs into words', () => {
    expect(words('hello%world%test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with dollar signs into words', () => {
    expect(words('hello$world$test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with at signs into words', () => {
    expect(words('hello@world@test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with hash signs into words', () => {
    expect(words('hello#world#test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with multiple special characters into words', () => {
    expect(words('hello!@#$%^&*()world')).toEqual(['hello', 'world']);
  });

  it('should split string with mixed separators into words', () => {
    expect(words('hello, world; test: final')).toEqual(['hello', 'world', 'test', 'final']);
  });

  it('should split string with numbers and letters into words', () => {
    expect(words('hello123world456test789')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with uppercase and lowercase letters into words', () => {
    expect(words('HelloWorldTest')).toEqual(['Hello', 'World', 'Test']);
  });

  it('should split string with mixed case into words', () => {
    expect(words('helloWorldTest')).toEqual(['hello', 'World', 'Test']);
  });

  it('should split string with all uppercase into words', () => {
    expect(words('HELLOWORLDTEST')).toEqual(['HELLOWORLDTEST']);
  });

  it('should split string with all lowercase into words', () => {
    expect(words('helloworldtest')).toEqual(['helloworldtest']);
  });

  it('should split string with numbers only into words', () => {
    expect(words('123456789')).toEqual([]);
  });

  it('should split string with special characters only into words', () => {
    expect(words('!@#$%^&*()')).toEqual([]);
  });

  it('should split string with spaces only into words', () => {
    expect(words('   ')).toEqual([]);
  });

  it('should split string with tabs only into words', () => {
    expect(words('\t\t\t')).toEqual([]);
  });

  it('should split string with newlines only into words', () => {
    expect(words('\n\n\n')).toEqual([]);
  });

  it('should split string with carriage returns only into words', () => {
    expect(words('\r\r\r')).toEqual([]);
  });

  it('should split string with form feeds only into words', () => {
    expect(words('\f\f\f')).toEqual([]);
  });

  it('should split string with vertical tabs only into words', () => {
    expect(words('\v\v\v')).toEqual([]);
  });

  it('should split string with backspaces only into words', () => {
    expect(words('\b\b\b')).toEqual([]);
  });

  it('should split string with null characters only into words', () => {
    expect(words('\0\0\0')).toEqual([]);
  });

  it('should split string with unicode characters only into words', () => {
    expect(words('🚀😀🎉')).toEqual([]);
  });

  it('should split string with emoji only into words', () => {
    expect(words('😀🚀🎉')).toEqual([]);
  });

  it('should split string with special characters only into words', () => {
    expect(words('!@#$%^&*()')).toEqual([]);
  });

  it('should split string with mixed separators only into words', () => {
    expect(words(',;:!@#$%^&*()')).toEqual([]);
  });

  it('should split string with numbers and special characters only into words', () => {
    expect(words('123!@#456$%^789')).toEqual([]);
  });

  it('should split string with letters and special characters only into words', () => {
    expect(words('hello!@#world$%^test')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters and numbers only into words', () => {
    expect(words('hello123world456test789')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, and special characters into words', () => {
    expect(words('hello123!@#world456$%^test789')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, and separators into words', () => {
    expect(words('hello123!@#world456$%^test789,;:')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, and spaces into words', () => {
    expect(words('hello123!@#world456$%^test789,;: ')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, and tabs into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, and newlines into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, and carriage returns into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, and form feeds into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, form feeds, and vertical tabs into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f\v')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and backspaces into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f\v\b')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and null characters into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f\v\b\0')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and unicode into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f\v\b\0🚀')).toEqual(['hello', 'world', 'test']);
  });

  it('should split string with letters, numbers, special characters, separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and emoji into words', () => {
    expect(words('hello123!@#world456$%^test789,;: \t\n\r\f\v\b\0🚀😀')).toEqual(['hello', 'world', 'test']);
  });
});
