import { setWith } from '../../src/object/setWith';

describe('setWith', () => {
  it('sets value using customizer-created objects', () => {
    const obj: any = {};
    const customizer = (nsValue: any, key: string) => {
      return nsValue === undefined ? (isFinite(Number(key)) ? [] : {}) : nsValue;
    };
    setWith(obj, 'a.b[0].c', 42, customizer);
    expect(obj).toEqual({ a: { b: [{ c: 42 }] } });
  });
  it('falls back to default when customizer returns existing', () => {
    const obj: any = {};
    setWith(obj, 'x.y', 1, (ns) => ns);
    expect(obj).toEqual({ x: { y: 1 } });
  });
});
