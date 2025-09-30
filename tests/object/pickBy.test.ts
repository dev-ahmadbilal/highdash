import { pickBy } from '../../src/object/pickBy';

describe('pickBy', () => {
  it('picks properties matching predicate', () => {
    const obj = { a: 1, b: 0, c: 3 };
    expect(pickBy(obj, (v) => Boolean(v))).toEqual({ a: 1, c: 3 });
  });
  it('works with key-based predicate', () => {
    const obj = { secret: 1, public: 2 };
    expect(pickBy(obj, (_v, k) => k !== 'secret')).toEqual({ public: 2 });
  });
});
