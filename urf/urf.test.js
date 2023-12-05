const { 
    Zero, Succ, Null, Par, Pred, Add, Sub, Mult, Div2: Div2, Len, ShiftLeft, Rev, Concat, Trim,
    Element, Value, W, D, Q, S, N, R, T, Halt, M, U } = require('./urf')

test('Zero', () => {
    expect(Zero(0)).toBe(0)
    expect(Zero(1)).toBe(0)
    expect(Zero(2)).toBe(0)
    expect(Zero(42)).toBe(0)
})

test('Succ', () => {
    expect(Succ(0)).toBe(1)
    expect(Succ(1)).toBe(2)
    expect(Succ(2)).toBe(3)
    expect(Succ(42)).toBe(43)
})

test('Pred', () => {
    expect(Pred(0)).toBe(0)
    expect(Pred(1)).toBe(0)
    expect(Pred(2)).toBe(1)
    expect(Pred(42)).toBe(41)
})

test('Add', () => {
    expect(Add(0, 0)).toBe(0)
    expect(Add(1, 0)).toBe(1)
    expect(Add(0, 2)).toBe(2)
    expect(Add(2, 3)).toBe(5)
    expect(Add(42, 123)).toBe(165)
})

test('Sub', () => {
    expect(Sub(0, 0)).toBe(0)
    expect(Sub(1, 0)).toBe(1)
    expect(Sub(0, 2)).toBe(0)
    expect(Sub(2, 3)).toBe(0)
    expect(Sub(3, 2)).toBe(1)
    expect(Sub(42, 123)).toBe(0)
    expect(Sub(123, 42)).toBe(81)
})

test('Mult', () => {
    expect(Mult(0, 0)).toBe(0)
    expect(Mult(1, 0)).toBe(0)
    expect(Mult(0, 2)).toBe(0)
    expect(Mult(2, 3)).toBe(6)
    expect(Mult(42, 123)).toBe(5166)
})

test('Null', () => {
    expect(Null(0)).toBe(1)
    expect(Null(1)).toBe(0)
    expect(Null(2)).toBe(0)
    expect(Null(3)).toBe(0)
    expect(Null(42)).toBe(0)
})

test('Par', () => {
    expect(Par(0)).toBe(0)
    expect(Par(1)).toBe(1)
    expect(Par(2)).toBe(0)
    expect(Par(3)).toBe(1)
    expect(Par(42)).toBe(0)
})

test('Div2', () => {
    expect(Div2(0)).toBe(0)
    expect(Div2(1)).toBe(0)
    expect(Div2(2)).toBe(1)
    expect(Div2(3)).toBe(1)
    expect(Div2(42)).toBe(21)
    expect(Div2(123)).toBe(61)
})

test('Len', () => {
    expect(Len(0b0000)).toBe(0)
    expect(Len(0b0001)).toBe(1)
    expect(Len(0b0010)).toBe(2)
    expect(Len(0b0011)).toBe(2)
    expect(Len(0b0100)).toBe(3)
    expect(Len(0b0101)).toBe(3)
    expect(Len(0b0110)).toBe(3)
    expect(Len(0b0111)).toBe(3)
    expect(Len(0b1000)).toBe(4)
    expect(Len(0b1001)).toBe(4)
    expect(Len(0b1010)).toBe(4)
    expect(Len(0b1011)).toBe(4)
    expect(Len(0b1111)).toBe(4)
    expect(Len(0b0000000100011010)).toBe(9)
})

test('ShiftLeft', () => {
    expect(ShiftLeft(0b0000, 0)).toBe(0b0000)
    expect(ShiftLeft(0b0000, 1)).toBe(0b0000)
    expect(ShiftLeft(0b0000, 2)).toBe(0b0000)
    expect(ShiftLeft(0b0001, 0)).toBe(0b0001)
    expect(ShiftLeft(0b0001, 1)).toBe(0b0010)
    expect(ShiftLeft(0b0001, 2)).toBe(0b0100)
    expect(ShiftLeft(0b0011, 0)).toBe(0b0011)
    expect(ShiftLeft(0b0011, 1)).toBe(0b0110)
    expect(ShiftLeft(0b0011, 2)).toBe(0b1100)
    expect(ShiftLeft(0b0011, 1)).toBe(0b0110)
    expect(ShiftLeft(0b0010, 0)).toBe(0b0010)
    expect(ShiftLeft(0b0010, 1)).toBe(0b0100)
    expect(ShiftLeft(0b0010, 2)).toBe(0b1000)
    expect(ShiftLeft(0b0101, 0)).toBe(0b0101)
    expect(ShiftLeft(0b0101, 1)).toBe(0b1010)
    expect(ShiftLeft(0b0000000100011010, 5)).toBe(0b0010001101000000)
})

test('Rev', () => {
    expect(Rev(0b0000)).toBe(0b0000)
    expect(Rev(0b0001)).toBe(0b0001)
    expect(Rev(0b0011)).toBe(0b0011)
    expect(Rev(0b0010)).toBe(0b0001)
    expect(Rev(0b0110)).toBe(0b0011)
    expect(Rev(0b1110)).toBe(0b0111)
    expect(Rev(0b1101)).toBe(0b1011)
})

test('Concat', () => {
    expect(Concat(0b0000, 0b0000)).toBe(0b0000)
    expect(Concat(0b0001, 0b0000)).toBe(0b0001)
    expect(Concat(0b0000, 0b0001)).toBe(0b00000001)
    expect(Concat(0b0011, 0b0001)).toBe(0b00111)
    expect(Concat(0b0100, 0b0010)).toBe(0b010010)
    expect(Concat(0b1101, 0b0111)).toBe(0b1101111)
    expect(Concat(0b1111, 0b0000)).toBe(0b1111)
    expect(Concat(0b1, 0b1)).toBe(0b11)
    expect(Concat(0b1, 0b0)).toBe(0b1)
    expect(Concat(0b0, 0b1)).toBe(0b01)
})

test('Trim', () => {
    expect(Trim(0b0000)).toBe(0b0000)
    expect(Trim(0b0001)).toBe(0b0001)
    expect(Trim(0b0010)).toBe(0b0001)
    expect(Trim(0b0100)).toBe(0b0001)
    expect(Trim(0b1000)).toBe(0b0001)
    expect(Trim(0b0101)).toBe(0b0101)
    expect(Trim(0b1100)).toBe(0b0011)
    expect(Trim(0b1001)).toBe(0b1001)
    expect(Trim(0b1101)).toBe(0b1101)
})

// (q0, 0, 1, >, q1), (q0, 1, 0, >, q2), (q1, 0, 1, <, q1), (q1, 1, 1, <, q3), ...
const m = [1, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 3]
const n = 0b110, r = 0b1101

test('Element', () => {
    expect(Element(m,  0)).toBe(1)
    expect(Element(m,  1)).toBe(1)
    expect(Element(m,  2)).toBe(1)
    expect(Element(m,  3)).toBe(0)
    expect(Element(m,  4)).toBe(1)
    expect(Element(m,  5)).toBe(2)
    expect(Element(m,  6)).toBe(1)
    expect(Element(m,  7)).toBe(0)
    expect(Element(m,  8)).toBe(1)
    expect(Element(m,  9)).toBe(1)
    expect(Element(m, 10)).toBe(0)
    expect(Element(m, 11)).toBe(3)
})

test('Value', () => {
    expect(Value(0, n, r)).toBe(0b1101011)
})

test('W', () => {
    expect(W(m, 0, n, r)).toBe(1)
    expect(W(m, 1, n, r)).toBe(1)
    expect(W(m, 0, 0, 0)).toBe(1)
    expect(W(m, 1, 0, 0)).toBe(1)
    expect(W(m, 0, 1, 0)).toBe(0)
    expect(W(m, 1, 1, 0)).toBe(1)
})

test('D', () => {
    expect(D(m, 0, n, r)).toBe(1)
    expect(D(m, 0, n, r)).toBe(1)
    expect(D(m, 1, n, r)).toBe(0)
    expect(D(m, 1, n, r)).toBe(0)
})

test('Q', () => {
    expect(Q(m, 0, n, r)).toBe(1)
    expect(Q(m, 0, 1, 0)).toBe(2)
    expect(Q(m, 1, n, r)).toBe(1)
    expect(Q(m, 1, 1, 0)).toBe(3)
    expect(Q(m, 0, 0, 0b1101011)).toBe(1)
})

test('S', () => {
    expect(S(1, 0)).toBe(1)
    expect(S(0, 1)).toBe(0)
    expect(S(n, r)).toBe(0)
    expect(S(0, 0b1101011)).toBe(0)
})

test('N', () => {
    expect(N(m, 0, n, r)).toBe(0b1111)
    expect(N(m, 1, n, r)).toBe(0b11)
    expect(N(m, 0, 0, 0b1101011)).toBe(0b11)
})

test('R', () => {
    expect(R(m, 0, n, r)).toBe(0b0110)
    expect(R(m, 1, n, r)).toBe(0b11011)
    expect(R(m, 0, 0, 0b1101011)).toBe(0b110101)
})

test('T', () => {
    expect(T(m, 0, n, r, 0)).toStrictEqual([1, 0b1111, 0b110])
    expect(T(m, 0, n, r, 1)).toStrictEqual([3, 0b111, 0b1101])
    expect(T(m, 0, 0, 0b1101011, 0)).toStrictEqual([1, 0b11, 0b110101])
    expect(T(m, 0, 0, 0b1101011, 1)).toStrictEqual([3, 0b1, 0b1101011])
})

test('Halt', () => {
    expect(Halt(m, 0b1101011, 3)).toBe(1)
    expect(Halt(m, 0, 3)).toBe(2)
    expect(Halt(m, 1, 3)).toBe(1)
})

test('M', () => {
    expect(M(m, 0b1101011, 3)).toStrictEqual([3, 0b1, 0b1101011])
    expect(M(m, 1, 3)).toStrictEqual([3, 0b1, 0b01])
    expect(M(m, 0b111, 3)).toStrictEqual([3, 0b1, 0b111])
})

test('U', () => {
    expect(U(m, 0b1101011, 3)).toBe(0b11101011)
    expect(U(m, 1, 3)).toBe(0b11)
    expect(U(m, 0b111, 3)).toBe(0b1111)
})