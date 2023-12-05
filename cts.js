/** Cyclic Tag System */

const productions = [
    'rRR', 'RrR', 'RRR'
]
let word = 'rRrR'

console.log(word)

let t = 0
let i = 0
while (word.length && t < 100/*max steps*/) {
    if (word[0] === 'r') 
        word += productions[i]
    word = word.substring(1)

    i = (i + 1) % productions.length

    console.log(' '.repeat(++t) + word)
}
