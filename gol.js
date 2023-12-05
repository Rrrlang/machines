/** The Game of Life */

// glider
const universe = [
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

const speed = 500 // ms

evolve()

function evolve() {
    console.clear()
    console.log(display())

    const u = JSON.parse(JSON.stringify(universe))

    for (let y = 0; y < universe.length; y++) {
        for (let x = 0; x < universe.length; x++) {
            let neighborhood = 0
            //  1 2 3
            //  8   4
            //  7 6 5
            neighborhood += u[y > 0 ? y - 1 : u.length - 1][x > 0 ? x - 1 : u.length - 1]
            neighborhood += u[y > 0 ? y - 1 : u.length - 1][x]
            neighborhood += u[y > 0 ? y - 1 : u.length - 1][x < u.length - 1 ? x + 1 : 0]
            neighborhood += u[y][x < u.length - 1 ? x + 1 : 0]
            neighborhood += u[y < u.length - 1 ? y + 1 : 0][x < u.length - 1 ? x + 1 : 0]
            neighborhood += u[y < u.length - 1 ? y + 1 : 0][x]
            neighborhood += u[y < u.length - 1 ? y + 1 : 0][x > 0 ? x - 1 : u.length - 1]
            neighborhood += u[y][x > 0 ? x - 1 : u.length - 1]

            // underpopulation
            if (neighborhood < 2) universe[y][x] = 0
            // overpopulation
            if (neighborhood > 3) universe[y][x] = 0
            // reproduction
            if (neighborhood == 3) universe[y][x] = 1
        }
    }

    setTimeout(evolve, speed)
}

function display() {
    let d = ''
    d += '╔'
    for (let y = 0; y < universe.length; y++) d += '══'
    d += '╗'
    for (let y = 0; y < universe.length; y++) {
        d += '\n║'
        for (let x = 0; x < universe.length; x++) {
            d += !!universe[y][x] ? '██' : '  '
        }
        d += '║'
    }
    d += '\n╚'
    for (let y = 0; y < universe.length; y++) d += '══'
    d += '╝'
    return d
}