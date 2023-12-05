const { U } = require('./urf')

test('U: change bit', () => {
    // (q0, 0, 1, >, q1), (q0, 1, 0, >, q1)
    const m = [1, 1, 1, 0, 1, 1]
    expect(U(m, 0b0, 1)).toBe(0b1)
    expect(U(m, 0b1, 1)).toBe(0b11)
    expect(U(m, 0b11, 1)).toBe(0b111)
})

test('U: flip 0 bits until first 1', () => {
    // (q0, 0, 1, >, q0), (q0, 1, 1, >, q2)
    const m = [1, 1, 0, 1, 1, 2]
    expect(U(m, 0b1, 2)).toBe(0b11)
})

test('U: flip 010101... bits', () => {
    // (q0, 0, 1, >, q1), (q0, 1, 1, >, q2), (q1, 0, 0, >, q2), (q1, 1, 0, >, q0)
    const m = [1, 1, 1, 1, 1, 2, 0, 1, 2, 0, 1, 0]
    expect(U(m, 0b0, 2)).toBe(0b1)
    expect(U(m, 0b1, 2)).toBe(0b101)
    expect(U(m, 0b11, 2)).toBe(0b101)
    expect(U(m, 0b111, 2)).toBe(0b1011)
    expect(U(m, 0b10101, 2)).toBe(0b1010101)
})

test('U: busy beaver for one state', () => {
    // (q0, 0, 1, >, q1)
    const m = [1, 1, 1]
    expect(U(m, 0, 1)).toBe(0b1)
})

test('U: busy beaver for two states', () => {
    // (q0, 0, 1, >, q1), (q0, 1, 1, <, q1), (q1, 0, 1, <, q0), (q1, 1, 1, >, q2)
    const m = [1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 2]
    expect(U(m, 0, 2)).toBe(0b1111)
})