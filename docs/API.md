# Highdash API Reference

> **Complete documentation for all 228 Highdash functions**

## Table of Contents

- [Core Functions](core.md) (8 functions)
- [Array Functions](array.md) (21 functions)
- [Collection Functions](collection.md) (16 functions)
- [Language Functions](lang.md) (51 functions)
- [Object Functions](object.md) (45 functions)
- [Function Utilities](function.md) (20 functions)
- [String Functions](string.md) (17 functions)
- [Math Functions](math.md) (10 functions)
- [Number Functions](number.md) (2 functions)
- [Utility Functions](util.md) (39 functions)

---

## Introduction

Highdash provides a modern, TypeScript-first alternative to Lodash, focusing on performance, type safety, and bundle optimization. This API reference serves as a comprehensive guide to all available functions.

Each module below contains detailed documentation for its respective functions, including parameters, return types, examples, and usage notes.

---

## Core Functions

Essential functions for common programming patterns.

- [`debounce`](core.md#debouncefunc-wait-options)
- [`throttle`](core.md#throttlefunc-wait-options)
- [`cloneDeep`](core.md#clonedeepvalue)
- [`cloneDeepWith`](core.md#clonedeepwithvalue-customizer)
- [`merge`](core.md#mergeobject-sources)
- [`mergeDeep`](core.md#mergedeepobject-sources)
- [`uniq`](core.md#uniqarray)
- [`groupBy`](core.md#groupbycollection-iteratee)

---

## Array Functions

Functions for working with arrays and array-like objects.

- [`chunk`](array.md#chunkarray-size)
- [`compact`](array.md#compactarray)
- [`difference`](array.md#differencearray-values)
- [`intersection`](array.md#intersectionarrays)
- [`union`](array.md#unionarrays)
- [`flatten`](array.md#flattenarray)
- [`flattenDeep`](array.md#flattendeeparray)
- [`head`](array.md#headarray)
- [`tail`](array.md#tailarray)
- [`last`](array.md#lastarray)
- [`initial`](array.md#initialarray)
- [`take`](array.md#takearray-n)
- [`takeRight`](array.md#takerightarray-n)
- [`drop`](array.md#droparray-n)
- [`dropRight`](array.md#droprightarray-n)
- [`sortBy`](array.md#sortbyarray-iteratees)
- [`zip`](array.md#ziparrays)
- [`unzip`](array.md#unziparray)
- [`pull`](array.md#pullarray-values)
- [`remove`](array.md#removearray-predicate)
- [`without`](array.md#withoutarray-values)

---

## Collection Functions

Functions for working with collections (arrays and objects).

- [`each`](collection.md#eachcollection-iteratee)
- [`eachRight`](collection.md#eachrightcollection-iteratee)
- [`every`](collection.md#everycollection-predicate)
- [`filter`](collection.md#filtercollection-predicate)
- [`find`](collection.md#findcollection-predicate-fromindex)
- [`findLast`](collection.md#findlastcollection-predicate-fromindex)
- [`flatMap`](collection.md#flatmapcollection-iteratee)
- [`flatMapDeep`](collection.md#flatmapdeepcollection-iteratee)
- [`flatMapDepth`](collection.md#flatmapdepthcollection-iteratee-depth)
- [`forEach`](collection.md#foreachcollection-iteratee)
- [`forEachRight`](collection.md#foreachrightcollection-iteratee)
- [`includes`](collection.md#includescollection-value-fromindex)
- [`invokeMap`](collection.md#invokemapcollection-path-args)
- [`keyBy`](collection.md#keybycollection-iteratee)
- [`map`](collection.md#mapcollection-iteratee)
- [`orderBy`](collection.md#orderbycollection-iteratees-orders)
- [`partition`](collection.md#partitioncollection-predicate)
- [`reduce`](collection.md#reducecollection-iteratee-accumulator)
- [`reduceRight`](collection.md#reducerightcollection-iteratee-accumulator)
- [`reject`](collection.md#rejectcollection-predicate)
- [`sample`](collection.md#samplecollection)
- [`sampleSize`](collection.md#samplesizecollection-n)
- [`shuffle`](collection.md#shufflecollection)
- [`size`](collection.md#sizecollection)
- [`some`](collection.md#somecollection-predicate)

---

## Language Functions

Type checking, comparison, and conversion utilities.

- [`isArray`](lang.md#isarrayvalue)
- [`isArrayLike`](lang.md#isarraylikevalue)
- [`isArrayLikeObject`](lang.md#isarraylikeobjectvalue)
- [`isArrayBuffer`](lang.md#isarraybuffervalue)
- [`isBoolean`](lang.md#isbooleanvalue)
- [`isBuffer`](lang.md#isbuffervalue)
- [`isDate`](lang.md#isdatevalue)
- [`isElement`](lang.md#iselementvalue)
- [`isError`](lang.md#iserrorvalue)
- [`isFunction`](lang.md#isfunctionvalue)
- [`isMap`](lang.md#ismapvalue)
- [`isNull`](lang.md#isnullvalue)
- [`isNumber`](lang.md#isnumbervalue)
- [`isObject`](lang.md#isobjectvalue)
- [`isObjectLike`](lang.md#isobjectlikevalue)
- [`isPlainObject`](lang.md#isplainobjectvalue)
- [`isRegExp`](lang.md#isregexpvalue)
- [`isSet`](lang.md#issetvalue)
- [`isString`](lang.md#isstringvalue)
- [`isSymbol`](lang.md#issymbolvalue)
- [`isTypedArray`](lang.md#istypedarrayvalue)
- [`isUndefined`](lang.md#isundefinedvalue)
- [`isWeakMap`](lang.md#isweakmapvalue)
- [`isWeakSet`](lang.md#isweaksetvalue)
- [`isArguments`](lang.md#isargumentsvalue)
- [`isLength`](lang.md#islengthvalue)
- [`isNative`](lang.md#isnativevalue)
- [`isNil`](lang.md#isnilvalue)
- [`isEmpty`](lang.md#isemptyvalue)
- [`isEqual`](lang.md#isequalvalue-other)
- [`isEqualWith`](lang.md#isequalwithvalue-other-customizer)
- [`isMatch`](lang.md#ismatchobject-source)
- [`isMatchWith`](lang.md#ismatchwithobject-source-customizer)
- [`conformsTo`](lang.md#conformstoobject-source)
- [`eq`](lang.md#eqvalue-other)
- [`gt`](lang.md#gtvalue-other)
- [`gte`](lang.md#gtevalue-other)
- [`lt`](lang.md#ltvalue-other)
- [`lte`](lang.md#ltevalue-other)
- [`toArray`](lang.md#toarrayvalue)
- [`toNumber`](lang.md#tonumbervalue)
- [`toString`](lang.md#tostringvalue)
- [`castArray`](lang.md#castarrayvalue)
- [`clone`](lang.md#clonevalue)
- [`cloneWith`](lang.md#clonewithvalue-customizer)
- [`toFinite`](lang.md#tofinitevalue)
- [`toInteger`](lang.md#tointegervalue)
- [`toLength`](lang.md#tolengthvalue)
- [`toSafeInteger`](lang.md#tosafeintegervalue)
- [`toPlainObject`](lang.md#toplainobjectvalue)

---

## Object Functions

Object property manipulation and iteration utilities.

- [`keys`](object.md#keysobject)
- [`keysIn`](object.md#keysinobject)
- [`values`](object.md#valuesobject)
- [`valuesIn`](object.md#valuesinobject)
- [`entries`](object.md#entriesobject)
- [`entriesIn`](object.md#entriesinobject)
- [`toPairs`](object.md#topairsobject)
- [`toPairsIn`](object.md#topairsinobject)
- [`get`](object.md#getobject-path-defaultvalue)
- [`set`](object.md#setobject-path-value)
- [`setIn`](object.md#setinobject-path-value)
- [`setWith`](object.md#setwithobject-path-value-customizer)
- [`update`](object.md#updateobject-path-updater)
- [`updateIn`](object.md#updateinobject-path-updater)
- [`updateWith`](object.md#updatewithobject-path-updater-customizer)
- [`unset`](object.md#unsetobject-path)
- [`unsetIn`](object.md#unsetinobject-path)
- [`has`](object.md#hasobject-path)
- [`hasIn`](object.md#hasinobject-path)
- [`at`](object.md#atobject-paths)
- [`assign`](object.md#assignobject-sources)
- [`assignIn`](object.md#assigninobject-sources)
- [`assignWith`](object.md#assignwithobject-sources-customizer)
- [`assignInWith`](object.md#assigninwithobject-sources-customizer)
- [`extend`](object.md#extendobject-sources)
- [`extendWith`](object.md#extendwithobject-sources-customizer)
- [`defaults`](object.md#defaultsobject-sources)
- [`defaultsDeep`](object.md#defaultsdeepobject-sources)
- [`findKey`](object.md#findkeyobject-predicate)
- [`findLastKey`](object.md#findlastkeyobject-predicate)
- [`forIn`](object.md#forinobject-iteratee)
- [`forInRight`](object.md#forinrightobject-iteratee)
- [`forOwn`](object.md#forownobject-iteratee)
- [`forOwnRight`](object.md#forownrightobject-iteratee)
- [`functions`](object.md#functionsobject)
- [`functionsIn`](object.md#functionsinobject)
- [`invert`](object.md#invertobject)
- [`invertBy`](object.md#invertbyobject-iteratee)
- [`invoke`](object.md#invokeobject-path-args)
- [`mapKeys`](object.md#mapkeysobject-iteratee)
- [`mergeWith`](object.md#mergewithobject-sources-customizer)
- [`result`](object.md#resultobject-path-defaultvalue)
- [`transform`](object.md#transformobject-iteratee-accumulator)

---

## Function Utilities

Functional programming utilities and function manipulation.

- [`once`](function.md#oncefunc)
- [`memoize`](function.md#memoizefunc-resolver)
- [`after`](function.md#aftern-func)
- [`before`](function.md#beforen-func)
- [`curry`](function.md#curryfunc-arity)
- [`curryRight`](function.md#curryrightfunc-arity)
- [`partial`](function.md#partialfunc-partials)
- [`partialRight`](function.md#partialrightfunc-partials)
- [`flip`](function.md#flipfunc)
- [`negate`](function.md#negatepredicate)
- [`ary`](function.md#aryfunc-n)
- [`unary`](function.md#unaryfunc)
- [`wrap`](function.md#wrapvalue-wrapper)
- [`defer`](function.md#deferfunc-args)
- [`delay`](function.md#delayfunc-wait-args)
- [`rearg`](function.md#reargfunc-indexes)
- [`rest`](function.md#restfunc-start)
- [`spread`](function.md#spreadfunc-start)
- [`bind`](function.md#bindfunc-thisarg-partials)
- [`bindKey`](function.md#bindkeyobject-key-partials)

---

## String Functions

String manipulation and formatting utilities.

- [`camelCase`](string.md#camelcasestring)
- [`kebabCase`](string.md#kebabcasestring)
- [`snakeCase`](string.md#snakecasestring)
- [`startCase`](string.md#startcasestring)
- [`capitalize`](string.md#capitalizestring)
- [`upperFirst`](string.md#upperfirststring)
- [`lowerFirst`](string.md#lowerfirststring)
- [`lowerCase`](string.md#lowercasestring)
- [`upperCase`](string.md#uppercasestring)
- [`truncate`](string.md#truncatestring-options)
- [`pad`](string.md#padstring-length-chars)
- [`words`](string.md#wordsstring-pattern)
- [`deburr`](string.md#deburrstring)
- [`escape`](string.md#escapestring)
- [`escapeRegExp`](string.md#escaperegexpstring)
- [`unescape`](string.md#unescapestring)
- [`template`](string.md#templatestring-options)

---

## Math Functions

Mathematical operations and calculations.

- [`sum`](math.md#sumarray)
- [`sumBy`](math.md#sumbyarray-iteratee)
- [`max`](math.md#maxarray)
- [`maxBy`](math.md#maxbyarray-iteratee)
- [`min`](math.md#minarray)
- [`minBy`](math.md#minbyarray-iteratee)
- [`mean`](math.md#meanarray)
- [`meanBy`](math.md#meanbyarray-iteratee)
- [`add`](math.md#addaugend-addend)
- [`subtract`](math.md#subtractminuend-subtrahend)
- [`multiply`](math.md#multiplymultiplier-multiplicand)
- [`divide`](math.md#dividedividend-divisor)

---

## Number Functions

Number-specific utilities.

- [`clamp`](number.md#clampnumber-lower-upper)
- [`inRange`](number.md#inrangenumber-start-end)

---

## Utility Functions

General utilities, flow control, and modern async utilities.

- [`flow`](util.md#flowfuncs)
- [`flowRight`](util.md#flowrightfuncs)
- [`cond`](util.md#condpairs)
- [`attempt`](util.md#attemptfunc-args)
- [`pDebounce`](util.md#pdebouncefunc-wait)
- [`pThrottle`](util.md#pthrottlefunc-wait)
- [`pMap`](util.md#pmapcollection-mapper-options)
- [`retry`](util.md#retryfunc-options)
- [`timeout`](util.md#timeoutpromise-ms-message)
- [`identity`](util.md#identityvalue)
- [`noop`](util.md#noop)
- [`constant`](util.md#constantvalue)
- [`matches`](util.md#matchessource)
- [`matchesProperty`](util.md#matchespropertypath-srcvalue)
- [`property`](util.md#propertypath)
- [`propertyOf`](util.md#propertyofobject)
- [`method`](util.md#methodpath-args)
- [`methodOf`](util.md#methodofobject-args)
- [`iteratee`](util.md#iterateevalue)
- [`over`](util.md#overiteratees)
- [`overEvery`](util.md#overeverypredicates)
- [`overSome`](util.md#oversomepredicates)
- [`nthArg`](util.md#nthargn)
- [`conforms`](util.md#conformssource)
- [`defaultTo`](util.md#defaulttovalue-defaultvalue)
- [`uniqueId`](util.md#uniqueidprefix)
- [`random`](util.md#randomlower-upper-floating)
- [`range`](util.md#rangestart-end-step)
- [`rangeRight`](util.md#rangerightstart-end-step)
- [`times`](util.md#timesn-iteratee)
- [`toPath`](util.md#topathvalue)
- [`by`](util.md#byiteratee)
- [`thenBy`](util.md#thenbyiteratee)
- [`bindAll`](util.md#bindallobject-methodnames)
- [`mixin`](util.md#mixinobject-source)
- [`stubArray`](util.md#stubarray)
- [`stubFalse`](util.md#stubfalse)
- [`stubObject`](util.md#stubobject)
- [`stubString`](util.md#stubstring)
- [`stubTrue`](util.md#stubtrue)