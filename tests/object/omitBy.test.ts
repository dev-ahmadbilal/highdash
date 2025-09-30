import { omitBy } from '../../src/object/omitBy';

describe('omitBy', () => {
  it('omits properties matching predicate', () => {
    const obj = { a: 1, b: 0, c: 3 };
    expect(omitBy(obj, (v) => v === 0)).toEqual({ a: 1, c: 3 });
  });
  it('omits by key', () => {
    const obj = { secret: 1, public: 2 };
    expect(omitBy(obj, (_v, k) => k === 'secret')).toEqual({ public: 2 });
  });
});
