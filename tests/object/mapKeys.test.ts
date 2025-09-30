import { mapKeys } from '../../src/object/mapKeys';

describe('mapKeys', () => {
  it('maps keys using iteratee', () => {
    const obj = { a: 1, b: 2 };
    const out = mapKeys(obj, (_v, k) => k.toUpperCase());
    expect(out).toEqual({ A: 1, B: 2 });
  });
  it('supports iteratee as property name', () => {
    const obj = { a: { id: 'x' }, b: { id: 'y' } };
    // if implementation supports shorthand
    const out = mapKeys(obj, 'id' as any);
    expect(out).toEqual({ x: { id: 'x' }, y: { id: 'y' } });
  });
});
