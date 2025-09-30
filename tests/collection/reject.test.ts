import { reject } from '../../src/collection/reject';

describe('reject', () => {
  it('rejects elements matching predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false }
    ];
    
    expect(reject(users, (o) => !o.active)).toEqual([{ user: 'barney', active: true }]);
  });

  it('works with object predicate', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true }
    ];
    
    expect(reject(users, { age: 40, active: true })).toEqual([{ user: 'barney', age: 36, active: false }]);
  });

  it('works with property predicate', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: true }
    ];
    
    expect(reject(users, 'active')).toEqual([{ user: 'barney', active: false }]);
  });

  it('handles empty array', () => {
    expect(reject([], (x) => x > 0)).toEqual([]);
  });

  it('handles null input', () => {
    expect(reject(null, (x) => x > 0)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(reject(undefined, (x) => x > 0)).toEqual([]);
  });
});
