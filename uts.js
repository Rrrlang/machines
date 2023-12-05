/** Universal Tag System */

// TM to simulate: (move right, count cells from 1; flip odd cells, if an even cell is 1, keep it and continue, halt otherwise)
//
// Examples:
// 0 => 10
// 1 => 11
// 10 => 00
// 11 => 110
// 111 => 1011
// 1001 => 10101
// 11011 => 11110
// 
//  (q1,0,1,>,q2), (q1,1,0,>,q2), (q2,1,1,>,q1)
//              
//       -- 0,1,R --> 
//       -- 1,0,R -->
//  (Q1) <-- 1,1,R -- (Q2) -- 0 --> (H)
//

const deletion = 2
const productions = {
    // TRANSITION Q1->Q2

    // move right: adjust the m and n parts
    "A10":      ["A'10", "x", "a'10", "x"],  // +1 (write symbol is 1 for read symbol 0)
    "a10":      ["a'10", "x", "a'10", "x"],  // *2
    "A11":      ["A'11", "x"],               // +0 (write symbol is 0 for read symbol 1)
    "a11":      ["a'11", "x", "a'11", "x"],  // *2
    
    "B10":      ["B'10"],                    
    "b10":      ["b'10"],                    // /2
    "B11":      ["B'11"],                    
    "b11":      ["b'11"],                    // /2

    // prepare for the new read symbol in m and n
    "A'10":     ["A''21", "A''20"],
    "a'10":     ["a''21", "a''20"],
    "A'11":     ["A''21", "A''20"],
    "a'11":     ["a''21", "a''20"],
    
    "B'10":     ["B''21", "B''20"],
    "b'10":     ["b''21", "b''20"],
    "B'11":     ["B''21", "B''20"],
    "b'11":     ["b''21", "b''20"],

    // transform into the new state with the new read symbol
    "A''20":["x", "A20", "x"],  // pad for even n (odd length of bs)
    "a''20":     ["a20", "x"],
    "A''21":     ["A21", "x"],
    "a''21":     ["a21", "x"],

    "B''20":     ["B20", "x"],
    "b''20":     ["b20", "x"],
    "B''21":     ["B21", "x"],
    "b''21":     ["b21", "x"],

    // TRANSITION Q2->Q1

    // move right: adjust the m and n parts
    "A20":      ["H"],                      // halt (no transition from from Q2 for read symbol 0)
    "a20":      ["a"], 
    "A21":      ["A'21", "x", "a'21", "x"], // +1 (write symbol is 1 for read symbol 1)
    "a21":      ["a'21", "x", "a'21", "x"], // *2
    
    "B20":      [],                    
    "b20":      ["b"],
    "B21":      ["B'21"],                    
    "b21":      ["b'21"],                   // /2

    // prepare for the new read symbol in m and n
    "A'20":     ["A''11", "A''10"],
    "a'20":     ["a''11", "a''10"],
    "A'21":     ["A''11", "A''10"],
    "a'21":     ["a''11", "a''10"],
    
    "B'20":     ["B''11", "B''10"],
    "b'20":     ["b''11", "b''10"],
    "B'21":     ["B''11", "B''10"],
    "b'21":     ["b''11", "b''10"],

    // transform into the new state with the new read symbol
    "A''10":["x", "A10", "x"],  // pad for even n (odd number of bs)
    "a''10":     ["a10", "x"],
    "A''11":     ["A11", "x"],
    "a''11":     ["a11", "x"],

    "B''10":     ["B10", "x"],
    "b''10":     ["b10", "x"],
    "B''11":     ["B11", "x"],
    "b''11":     ["b11", "x"],
}

// 0 0 1
let word = [
    'A10', 'x', 
    'B10', 'x', 'b10', 'x',
]

// // 0 0 0
// let word = [
//     'A10', 'x', 
//     'B10', 'x',
// ]

// // 1 0 1
// let word = [
//     'A10', 'x', 'a10', 'x',
//     'B10', 'x', 'b10', 'x',
// ]

// // 0 0 11
// let word = [
//     'A10', 'x', // m = 0
//     'B10', 'x', 'b10', 'x', 'b10', 'x', 'b10', 'x' // 11 = 3 = n
// ]

// // 11 0 11
// let word = [
//     'A10', 'x', 'a10', 'x', 'a10', 'x', 'a10', 'x', // 11 = 3 m
//     'B10', 'x', 'b10', 'x', 'b10', 'x', 'b10', 'x'  // 11 = 3 = n
// ]

// // 1 0 01
// let word = [
//     'A10', 'x', 'a10', 'x',
//     'B10', 'x', 'b10', 'x', 'b10', 'x' // 10 = 2 = n
// ]

// // 1 0 101
// let word = [
//     'A10', 'x', 'a10', 'x',
//     'B10', 'x', 'b10', 'x', 'b10', 'x', 'b10', 'x', 'b10', 'x', 'b10', 'x' // 101 = 5 = n
// ]

// // 0 1 0
// let word = [
//     'A11', 'x', 
//     'B11', 'x',
// ]

// // 0 1 1
// let word = [
//     'A11', 'x', 
//     'B11', 'x', 'b11', 'x'
// ]

// // 1 1 1
// let word = [
//     'A11', 'x', 'a11', 'x',
//     'B11', 'x', 'b11', 'x'
// ]

console.log(word.join(' '))

let t = 0
let padding = ''
let s
while ((s = word[0]) != 'H' && word.length >= deletion && t++ < 1000/*max steps*/) {
    padding += word.splice(0, deletion).reduce((a,c) => a += ' '.repeat(c.length + 1), '')
    word.push(...productions[s])
    
    if (word[0].startsWith("A") || word[0].startsWith("H")) padding = ''
    console.log(padding + word.join(' '))
}
