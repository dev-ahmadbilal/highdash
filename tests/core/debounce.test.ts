import { debounce } from '../../src/core/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce a function', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced();
    debounced();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call function with leading option', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { leading: true, trailing: false });

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel debounced function', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced.cancel();

    jest.advanceTimersByTime(100);

    expect(func).not.toHaveBeenCalled();
  });

  it('should flush debounced function', () => {
    const func = jest.fn().mockReturnValue('result');
    const debounced = debounce(func, 100);

    debounced();
    const result = debounced.flush();

    expect(func).toHaveBeenCalledTimes(1);
    expect(result).toBe('result');
  });

  it('should respect maxWait option', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { maxWait: 200 });

    debounced();
    debounced();
    debounced();

    jest.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
