function once (lazyVal) {
  let cache
  // cache result could be null, false etc
  let evaled = false

  return () => {
    if (evaled) return cache

    evaled = true
    return (cache = lazyVal())
  }
}

const a = () => (console.count(), 3)
const b = () => 4
const x = once(() => a() === 0 ? 0 : a() * b())
const twice = v => v() + v()
const y = once(() => twice(x))

console.countReset()
console.log(y())
console.log(y())