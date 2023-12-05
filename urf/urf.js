function Zero(y) {
    return 0
}

function Succ(y) {
    return y + 1
}

function Pred(y) {
    if (y == 0) return 0
    return y - 1
}

function Add(x, y) {
    if (y == 0) return x
    return Succ(Add(x, y - 1))
}

function Sub(x, y) {
    if (y == 0) return x
    return Pred(Sub(x, y - 1))
}

function Mult(x, y) {
    if (y == 0) return 0
    return Add(x, Mult(x, y - 1))
}

function Null(y) {
    if (y == 0) return 1
    return 0
}

function Par(y) {
    if (y == 0) return 0
    return Null(Par(y - 1))
}

function Div2(y) {
    if (y == 0) return 0
    return Add(Div2(y - 1), Par(y - 1))
}

function Len(y) {
    if (y == 0) return 0
    return Succ(Len(Div2(y)))
}

function ShiftLeft(x, y) {
    if (y == 0) return x
    return Mult(ShiftLeft(x, y - 1), 2)
}

function Rev(y) {
    if (y == 0) return 0
    return Add(ShiftLeft(Par(y), Pred(Len(y))), Rev(Div2(y)))
}

function Concat(x, y) {
    return Add(ShiftLeft(x, Len(y)), y)
}

function Trim(y) {
    return Rev(Rev(y))
}

/** Minimization operator */
function Mi(x, y, p) {
    while (!p(x, y)) y++
    return y
}

function Element(m, index) {
    return m[index]
}

/** Read symbol under the head position */
function S(n, r) {
    return Par(n)
}

/** Write symbol */
function W(m, q, n, r) {
    return Element(m, Add(Mult(q, 6), Mult(S(n, r), 3)))
}

/** Move direction */
function D(m, q, n, r) {
    return Element(m, Add(Add(Mult(q, 6), Mult(S(n, r), 3)), 1))
}

/** Next state */
function Q(m, q, n, r) {
    return Element(m, Add(Add(Mult(q, 6), Mult(S(n, r), 3)), 2))
}

/** Left tape part */
function N(m, q, n, r) {
    const w = W(m, q, n, r)
    const d = D(m, q, n, r)
    return Add(Mult(Div2(Add(Sub(n, Par(n)), w)), Sub(1, d)), Mult(Add(Mult(2, Add(Sub(n, Par(n)), w)), Par(r)), d))
}

/** Right tape part */
function R(m, q, n, r) {
    const w = W(m, q, n, r)
    const d = D(m, q, n, r)
    return Add(Mult(Add(Mult(2, r), Par(Add(Sub(n, Par(n)), w))), Sub(1, d)), Mult(Div2(r), d))
}

/** Transition */
function T(m, q, n, r, t) {
    const q_ = Q(m, q, n, r)
    const n_ = N(m, q, n, r)
    const r_ = R(m, q, n, r)

    if (t == 0) return [q_, n_, r_]
    return T(m, q_, n_, r_, t - 1)
}

function Tq(m, q, n, r, t) {
    return T(m, q, n, r, t)[0]  // projection to q
}

/** Halt in time t for machine m, input x, and halting state qh */
function Halt(m, x, qh) {
    return Mi(x, 0, (x, t) => Tq(m, 0, 0, x, t) == qh)
}

function M(m, x, qh) {
    return T(m, 0, 0, x, Halt(m, x, qh))
}

function Value(q, n, r) {
    return Trim(Concat(n, Rev(r)))
}

function U(m, x, qf) {
    return Value(...M(m, x, qf))
}

module.exports = { 
    Zero, Succ, Null, Par, Pred, Add, Sub, Mult, Div2, Len, ShiftLeft, Rev, Concat, Trim,
    Element, Value, S, W, D, Q, N, R, T, Halt, M, U
}