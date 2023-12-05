/** Non-deterministic Finite Automaton */

class NFA {

    constructor(rules, init, ...accept) {
        this.rules = rules
        this.init = init
        this.accept = accept
    }

    compute(input) {
        return this._compute(this.init, input) 
            ? 'accepted' : 'rejected'
    }

    _compute(state, input) {
        if (!input.length && this.accept.includes(state)) return true

        return this.rules
            .filter(r => 
                r.state === state && (
                r.symbol === 'ε' || input.length && 
                r.symbol === input[0]))
            .map(r => this._compute(
                r.next, 
                r.symbol === 'ε' 
                    ? input : input.slice(1)))
            .some(result => !!result)
    }
}

class Rule {

    constructor(state, symbol, next) {
        this.state = state
        this.symbol = symbol
        this.next = next
    }
}

const R3 = new NFA([
        new Rule('S',  'R', 'S'), 
        new Rule('S',  'r', 'S'), 
        new Rule('S',  'R', 'R1'), 
        new Rule('R1', 'R', 'R2'), 
        new Rule('R2', 'R', 'R3')
    ], 'S', 'R3'
)

console.log("R3:")

console.log(R3.compute(''))        // rejected
console.log(R3.compute('x'))       // rejected
console.log(R3.compute('R'))       // rejected
console.log(R3.compute('RRRRR'))   // accepted
console.log(R3.compute('rRRRr'))   // rejected
console.log(R3.compute('rRRR'))    // accepted
console.log(R3.compute('rrrRRR'))  // accepted 
console.log(R3.compute('RrrRRR'))  // accepted
console.log(R3.compute('RrRRRR'))  // accepted
console.log(R3.compute('rRrRRR'))  // accepted
console.log(R3.compute('RrRrRRR')) // accepted 


const REven = new NFA([
        new Rule('S',  'ε', 'Re'), 
        new Rule('S',  'ε', 're'), 
        new Rule('Re', 'R', 'Ro'), 
        new Rule('Ro', 'R', 'Re'), 
        new Rule('re', 'r', 'ro'), 
        new Rule('ro', 'r', 're')
    ], 'S', 'Re', 're'
)

console.log("\nREven:")

console.log(REven.compute(''))       // accepted
console.log(REven.compute('x'))      // rejected
console.log(REven.compute('R'))      // rejected
console.log(REven.compute('Rr'))     // rejected
console.log(REven.compute('RRr'))    // rejected
console.log(REven.compute('RRrr'))   // rejected
console.log(REven.compute('RR'))     // accepted
console.log(REven.compute('rr'))     // accepted
console.log(REven.compute('RRRR'))   // accepted
console.log(REven.compute('rrrr'))   // accepted
console.log(REven.compute('RRRRRR')) // accepted
console.log(REven.compute('rrrrrr')) // accepted
