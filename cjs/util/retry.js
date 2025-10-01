"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
function retry(fn, options = {}) {
    const { retries = 3, factor = 2, minTimeout = 100, maxTimeout = 2000, signal } = options;
    let attempt = 0;
    return new Promise((resolve, reject) => {
        const run = () => {
            var _a;
            if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                reject((_a = signal.reason) !== null && _a !== void 0 ? _a : new Error('Aborted'));
                return;
            }
            fn().then(resolve, (err) => {
                if (attempt >= retries) {
                    reject(err);
                    return;
                }
                const ms = Math.min(maxTimeout, Math.floor(minTimeout * Math.pow(factor, attempt)));
                attempt++;
                setTimeout(run, ms);
            });
        };
        run();
    });
}
