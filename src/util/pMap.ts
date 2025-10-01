/**
 * Concurrent promise mapper with a concurrency limit and AbortSignal support.
 *
 * @example
 * await pMap([1,2,3], async (x) => x * 2, { concurrency: 2 }); // [2,4,6]
 */
export interface PMapOptions {
  concurrency?: number;
  signal?: AbortSignal;
}

export async function pMap<Input, Output>(
  iterable: Iterable<Input> | AsyncIterable<Input>,
  mapper: (item: Input, index: number) => Promise<Output> | Output,
  options: PMapOptions = {},
): Promise<Output[]> {
  const { concurrency = Infinity, signal } = options;

  // Convert iterable to array first
  const items: Input[] = [];
  if (Symbol.asyncIterator in Object(iterable)) {
    for await (const item of iterable as AsyncIterable<Input>) {
      items.push(item);
    }
  } else {
    for (const item of iterable as Iterable<Input>) {
      items.push(item);
    }
  }

  if (items.length === 0) {
    return [];
  }

  const results: Output[] = new Array(items.length);
  const n = Number.isFinite(concurrency) && concurrency > 0 ? Math.floor(concurrency) : Infinity;

  if (n === Infinity || n >= items.length) {
    // Process all items concurrently
    const promises = items.map((item, index) => {
      if (signal?.aborted) {
        throw signal.reason ?? new Error('Aborted');
      }
      return Promise.resolve(mapper(item, index));
    });
    return Promise.all(promises);
  }

  // Process with concurrency limit
  const workers: Promise<void>[] = [];
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      if (signal?.aborted) {
        throw signal.reason ?? new Error('Aborted');
      }

      const index = currentIndex++;
      const item = items[index];

      const result = await Promise.resolve(mapper(item, index));
      results[index] = result;
    }
  }

  // Start workers
  for (let i = 0; i < n; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}
