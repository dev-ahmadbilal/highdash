"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = timeout;
/**
 * Wraps a promise with a timeout. Rejects after `ms` with the given reason.
 *
 * @example
 * await timeout(fetch(url), 5000, 'Request timed out');
 */
function timeout(promise, ms, reason = 'Timeout') {
    let timer;
    const t = new Promise((_, reject) => {
        timer = setTimeout(() => reject(typeof reason === 'string' ? new Error(reason) : reason), ms);
    });
    return Promise.race([promise.finally(() => clearTimeout(timer)), t]);
}
