// Mastering Javascript Functional Programming
// Federico Kereki

const sampleString = 'Hello world'

const deMethodize = fn => (obj, ...args) => fn.apply(obj, args)

const map = deMethodize(Array.prototype.map)
const toUpperCase = deMethodize(String.prototype.toUpperCase)

// [ 'H', 'E', 'L', 'L', 'O', ' ', 'W', 'O', 'R', 'L', 'D' ]
console.log(
  map(sampleString, toUpperCase)
)

const localString = deMethodize(Number.prototype.toLocaleString)

// [ '1.234', '155,900.89', '1,500,000' ]
console.log(
  map([1.234, 155900.89, 1500000], localString)
)