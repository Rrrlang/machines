/** Lambda calculus */

// example values
const a = 'a'
const b = 'b'
const c = 'c'
const T = 'T'
const F = 'F'

// anonymous identity
console.log(
    ((x) => x)(a)
)  // a

// multiple arguments

var f1 = (x) => x
var f2 = (x) => x
console.log(
    ((x, y, z) => x(y(z)))(f1, f2, c)
) // c

// named identity
const identity = (x) => x
console.log(
    identity(a)
) // a

const apply = (f, x) => f(x)

const identity2 = (x) => apply(identity, x)
console.log(
    identity2(a)
) // a

// numbers
const _0 = (f, x) => x
const succ = (n) => (f, x) => f(n(f, x))

const _1 = succ(_0)
const _2 = succ(_1)
const _3 = succ(_2)
const _4 = succ(_3)
const _5 = succ(_4)

const add = (m, n) => (f, x) => m(f, n(f, x))

const n = (x) => x + 1

console.log(
    _0(n, 0),       // 0
    succ(_0)(n, 0), // 1
    succ(_1)(n, 0), // 2
    succ(succ(_0))(n, 0), // 2
    succ(_2)(n, 0), // 3
    succ(succ(succ(_0)))(n, 0), // 3
    add(_1, _2)(n, 0), // 3
    add(_3, _2)(n, 0), // 5
)

// conditional branching

const first = (x, y) => x
const second = (x, y) => y

console.log(
    first(a, b), // a
    second(a, b) // b
)

const True = first
const False = second

const not = (x) => x(False, True)

console.log(
    not(True)(T, F), // F
    not(False)(T, F) // T
)

const and = (x, y) => x(y, False)

console.log(
    and(True, False)(T, F),  // F
    and(False, True)(T, F),  // F
    and(True, True)(T, F),   // T
    and(False, False)(T, F), // F
)

const or = (x, y) => x(True, y)

console.log(
    or(True, False)(T, F),  // T
    or(False, True)(T, F),  // T
    or(True, True)(T, F),   // T
    or(False, False)(T, F), // F
)

const ifElse = (x, t, f) => x(t, f)

console.log(
    ifElse(True, a, b),  // a
    ifElse(False, a, b), // b
    ifElse(or(False, True), a, b), // a
    ifElse(and(False, True), a, b), // b
    ifElse(or(and(False, True), or(False, True)), a, b), // a
)

// loops
const succ2 = (x) => x + 1      // numeric functions
const pred = (x) => x - 1
const isZero = (x) => x === 0

const addBase1 = (f, x, y) => isZero(y) ? x : f(f, succ2(x), pred(y))

const add1 = (x, y) => addBase1(addBase1, x, y)


const recursive = (f) => ((s) => f(s(s)))((s) => f(s(s)))

// const addBase2 = (f, x, y) => ifElse(isZero(y), x, f(succ2(x), pred(y)))  // Maximum call stack size exceeded
const addBase2 = (f, x, y) => isZero(y) ? x : f(succ2(x), pred(y))

const add2 = (x, y) => recursive(addBase2)(x, y)

console.log(
    add1(2, 1), // 3
    // add2(2, 1)  // Maximum call stack size exceeded
)

// data types

const tuple = (a, b) => (f) => f(a, b)

const t42 = tuple(4, 2)

console.log(
    t42(first), // 4
    t42(second) // 2
)

const list = (h, t) => tuple(h, t)
const head = (list) => list(first)
const tail = (list) => list(second)
const nil = list(0, 0)

const l1 = list(1, nil)
const l2 = list(1, list(2, nil))
const l3 = list(1, list(2, list(3, nil)))

console.log(
    head(l3), // 1
    tail(l3)(first), // 2
    tail(l3)(second)(first) // 3
)

const isEmpty = (list) => isZero(head(list))

console.log(
    isEmpty(l1), // false
    isEmpty(l2), // false
    isEmpty(l3), // false
    isEmpty(nil), // true
)

const lengthBase = (f) => (list) => isEmpty(list) ? 0 : succ2(f(f)(tail(list)))
const length = lengthBase(lengthBase)

console.log(
    length(l1), // 1
    length(l2), // 2
    length(l3), // 3
    length(nil), // 0
)

const selectBase = (f) => (list, n) => isZero(n) ? head(list) : f(f)(tail(list), pred(n))
const select = selectBase(selectBase)

console.log(
    select(l1, 0), // 1
    select(l2, 0), // 1
    select(l2, 1), // 2
    select(l3, 0), // 1
    select(l3, 1), // 2
    select(l3, 2), // 3    
)

// functional vs imperative

var x1 = 1
var y1 = x1
x1 = x1 + 1
console.log('x', x1, 'y', y1)

var x2 = 1
x2 = x2 + 1
var y2 = x2
console.log('x', x1, 'y', y2)

const x3 = 1
const y3 = x3
const z3 = apply(succ2, x3)
console.log('x', x3, 'y', y3)

// halting problem
console.log(
    ((s) => s(s))((s) => s(s))
)