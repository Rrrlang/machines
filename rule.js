/** One-dimensional cellular automaton */

const rule = 110
const universe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

const speed = 100 // ms

evolve()

function evolve() {
    display()

    const u = [...universe]
    for (let x = 0; x < universe.length; x++)
        universe[x] = next(u, x, rule)
    
    setTimeout(evolve, speed)

    function next(u, x, rule) {
        const idx = 
            (u[i(x - 1)] << 2) + (u[x] << 1) + (u[i(x + 1)])
        return (rule & (1 << idx)) > 0

        function i(x) { return (u.length + x) % u.length; }
    }
}

function display() {
    let d = ''
    for (let x = 0; x < universe.length; x++)
        d += universe[x] ? 'rR' : '  '
    console.log(d)
}