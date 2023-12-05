/**  One-instruction set computer (OISC) with the Melzak instruction */

const mem = []
mem['ONE'] = 1
mem['A'] = 0
mem['X'] = Number.MAX_VALUE

const melzak = (x, y, z, m, n) => {
    if (mem[y] > mem[x]) return m
    mem[x] -= mem[y]
    mem[z] += mem[y]
    return n
}

// Minsky machine simulation
const inc = (r, z) => melzak('X', 'ONE', r, r, z)
const jzdec = (r, m, n) => melzak(r, 'ONE', 'X', m, n)

// A == 0
console.log('A:', mem['A'])
let z

// INC
z = inc('A', 123)

// A == 1, 123
console.log('A:', mem['A'], '|', z)

// JZDEC false
z = jzdec('A', 124, 125)

// A == 0, 125
console.log('A:', mem['A'], '|', z)

// JZDEC true
z = jzdec('A', 126, 127)

// A == 0, 126
console.log('A:', mem['A'], '|', z)
