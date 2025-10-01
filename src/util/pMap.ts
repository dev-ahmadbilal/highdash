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
  const results: Output[] = [];
  const queue: Array<{ index: number; value: Input } | { done: true }> = [] as any;
  let index = 0;

  async function enqueueAll() {
    if (Symbol.asyncIterator in Object(iterable)) {
      for await (const item of iterable as AsyncIterable<Input>) {
        queue.push({ index: index++, value: item });
      }
    } else {
      for (const item of iterable as Iterable<Input>) {
        queue.push({ index: index++, value: item });
      }
    }
    (queue as any).push({ done: true });
  }

  let rejectOnce: (err: any) => void = () => {};
  const allDone = new Promise<void>((resolve, reject) => {
    rejectOnce = reject;
    enqueueAll()
      .then(() => resolve())
      .catch(reject);
  });

  async function worker() {
    while (true) {
      if (signal?.aborted) {
        throw signal.reason ?? new Error('Aborted');
      }
      const task = queue.shift();
      if (!task) {
        // Wait a tick for more tasks
        if ((queue as any).length === 0) {
          await new Promise((r) => setTimeout(r, 0));
        }
        continue;
      }
      if ((task as any).done) break;
      const { index: i, value } = task as { index: number; value: Input };
      try {
        const out = await mapper(value, i);
        results[i] = out as Output;
      } catch (err) {
        rejectOnce(err);
        throw err;
      }
    }
  }

  const workers: Promise<void>[] = [];
  const n = Number.isFinite(concurrency) && concurrency > 0 ? Math.floor(concurrency) : Infinity;
  const workerCount = n === Infinity ? 32 : n; // reasonable cap for microtasks
  for (let i = 0; i < workerCount; i++) workers.push(worker());

  await Promise.allSettled([allDone, ...workers]);
  return results;
}
