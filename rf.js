/** Recursive Functions */

function Add(x, y) {
    if (y == 0) return x
    return Succ(Add(x, y - 1))
}

function Succ(x) {
    return x + 1
}

console.log(Add(2, 3))