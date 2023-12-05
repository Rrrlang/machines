/** Tag System */

const d = 2 // deletion number
const productions = {
    'R': 'rrrH',
    'r': 'Rrr'
}
let word = 'Rrr'

console.log(word)

let t = 0
let s
while ((s = word[0]) != 'H' && word.length >= d && t < 100/*max steps*/) {
    word = word.substring(d)
    word += productions[s]

    console.log(' '.repeat((++t) * d) + word)    
}
