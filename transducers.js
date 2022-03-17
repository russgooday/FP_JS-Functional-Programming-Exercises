const pipe = (...fns) => x => fns.reduce((x, f) => f(x), x)

// map reducer factory
const map = f => step =>
  (a, c) => step(a, f(c))

// filter reducer factory
const filter = predicate => step =>
  (a, c) => predicate(c) ? step(a, c) : a

const isEven = n => n % 2 === 0
const double = n => n * 2

/**
 * call the map and filter methods
 * with the mapping callback and filter predicate
 * e.g. map(double) ->
 *   step => (a, c) => step(a, double(c))
 * compose the returned functions
*/

const doubleEvens = pipe(
  map(double),
  filter(isEven)
)

// the step reducer function
const arrayConcat = (a, c) => a.concat([c])

/**
 * invoke the pipe function passing in the step reducer function
 * returns the transduced reducer function
 * e.g. (a, c) => isEven(c) ? (a, c) => a.concat(c)(a, c) : a
*/
const xform = doubleEvens(arrayConcat)
;[1, 2, 3, 4, 5, 6].reduce(xform, []) // [4, 8, 12]

/**
 * Breakdown of transducing
 *
 * const doubleEvens = pipe(
 *   map(double),
 *   filter(isEven)
 * )
 *
 * doubleEvens(arrayConcat)
 */

/**
 * Return values inside pipe
 * step = (a, c) => a.concat(c)
 * 1. map -> (a, c) => (a, c) => a.concat(c)(a, double(c))
 * 2. filter -> (a, c) => isEven(c) ? (a, c) => a.concat(c)(a, c) : a
 * Output Reducer: (a, c) => isEven(c) ? (a, c) => a.concat(c)(a, c) : a
 *
 * In essense we are doing this
 * (a, c) => isEven(c) ? a.concat(double(c)) : a
 */

;[1, 2, 3, 4, 5, 6].reduce((a, c) => isEven(c) ? a.concat(double(c)) : a, []) // [4, 8, 12]


const curry = (fn) => {

  return fn.length === 0
    ? fn()
    : (...args) => curry(fn.bind(null, ...args))
}

const transduce = curry((step, initial, xform, foldable) =>
  foldable.reduce(xform(step), initial)
)

const toArray = transduce(arrayConcat, [])
console.log(toArray(doubleEvens, [1, 2, 3, 4, 5, 6]))
