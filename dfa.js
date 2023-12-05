/** Deterministic Finite Automaton */

class DFA {

    constructor(rules, init, ...accept) {
        this.rules = rules
        this.init = init
        this.state = init
        this.accept = accept
    }

    compute(input) {
        this.state = this.init
        for (let i = 0; i < input.length; i++) {
            const symbol = input[i]

            if (!this.next(symbol)) return 'rejected'
        }
        return this.accept.includes(this.state) 
            ? 'accepted' : 'rejected'
    }

    next(symbol) {
        const rule = this.rules.find(r => 
            r.state === this.state && 
            r.symbol === symbol)            
        
        if (!rule) return false
        
        this.state = rule.next

        if (rule.action) rule.action()

        return true
    }
}

class Rule {
    
    constructor(state, symbol, next, action) {
        this.state = state
        this.symbol = symbol
        this.next = next
        this.action = action
    }
}

const Rs = new DFA([
        new Rule('S',  'R', 'OK'), 
        new Rule('OK', 'R', 'OK')
    ], 'S', 'OK'
)

console.log(Rs.compute(''))        // rejected
console.log(Rs.compute('r'))       // rejected
console.log(Rs.compute('R'))       // accepted
console.log(Rs.compute('Rr'))      // rejected
console.log(Rs.compute('RRRRR'))   // accepted
console.log(Rs.compute('RRRRRr'))  // rejected