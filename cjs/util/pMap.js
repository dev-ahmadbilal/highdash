"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pMap = pMap;
function pMap(iterable_1, mapper_1) {
    return __awaiter(this, arguments, void 0, function* (iterable, mapper, options = {}) {
        const { concurrency = Infinity, signal } = options;
        const results = [];
        const queue = [];
        let index = 0;
        function enqueueAll() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                if (Symbol.asyncIterator in Object(iterable)) {
                    try {
                        for (var _d = true, _e = __asyncValues(iterable), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                            _c = _f.value;
                            _d = false;
                            const item = _c;
                            queue.push({ index: index++, value: item });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    for (const item of iterable) {
                        queue.push({ index: index++, value: item });
                    }
                }
                queue.push({ done: true });
            });
        }
        let rejectOnce = () => { };
        const allDone = new Promise((resolve, reject) => {
            rejectOnce = reject;
            enqueueAll()
                .then(() => resolve())
                .catch(reject);
        });
        function worker() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                while (true) {
                    if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                        throw (_a = signal.reason) !== null && _a !== void 0 ? _a : new Error('Aborted');
                    }
                    const task = queue.shift();
                    if (!task) {
                        // Wait a tick for more tasks
                        if (queue.length === 0) {
                            yield new Promise((r) => setTimeout(r, 0));
                        }
                        continue;
                    }
                    if (task.done)
                        break;
                    const { index: i, value } = task;
                    try {
                        const out = yield mapper(value, i);
                        results[i] = out;
                    }
                    catch (err) {
                        rejectOnce(err);
                        throw err;
                    }
                }
            });
        }
        const workers = [];
        const n = Number.isFinite(concurrency) && concurrency > 0 ? Math.floor(concurrency) : Infinity;
        const workerCount = n === Infinity ? 32 : n; // reasonable cap for microtasks
        for (let i = 0; i < workerCount; i++)
            workers.push(worker());
        yield Promise.allSettled([allDone, ...workers]);
        return results;
    });
}
