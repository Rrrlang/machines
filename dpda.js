/** Deterministic Push-Down Automaton */

class DPDA {

    constructor(rules, init, ...accept) {
        this.rules = rules
        this.init = init
        this.accept = accept
    }

    compute(input) {
        const stack = new Stack()
        
        let state = this.init
        let i = 0

        while (true) {
            const symbol = input[i]
            const pop = stack.pop()

            const rule = this.rules.find(r => 
                r.state === state && 
                r.pop === pop && (
                r.read === symbol || 
                r.read === 'ε'))

            if (!rule) {
                if (i < input.length) state = null
                break
            }
            if (rule.push !== 'ε') stack.push(rule.push)
            if (rule.read !== 'ε') i++

            state = rule.next
        }
        return this.accept.includes(state) 
            ? 'accepted' : 'rejected'
    }
}

class Rule {

    constructor(state, read, pop, push, next) {
        this.state = state
        this.read = read
        this.pop = pop
        this.push = push
        this.next = next
    }
}

class Stack {

    constructor(init = ['$']) {
        this.store = [...init]
    }

    pop() {
        return this.store.pop()
    }

    push(sequence) {
        sequence.split('')
            .reverse()
            .forEach(s => this.store.push(s))
    }

    peek() {
        return this.store[this.store.length - 1]
    }
}

console.log('Rⁿrⁿ:')

const Rr = new DPDA([
        new Rule('S', 'R', '$', 'X$', 'R'), 
        new Rule('R', 'R', 'X', 'XX', 'R'), 
        new Rule('R', 'r', 'X', 'ε',  'r'), 
        new Rule('r', 'r', 'X', 'ε',  'r'), 
        new Rule('r', 'ε', '$', '$',  'Rr')
    ], 'S', 'S', 'Rr'
)

console.log(Rr.compute(''))        // accepted
console.log(Rr.compute('R'))       // rejected
console.log(Rr.compute('r'))       // rejected
console.log(Rr.compute('RR'))      // rejected
console.log(Rr.compute('rr'))      // rejected
console.log(Rr.compute('Rr'))      // accepted
console.log(Rr.compute('RRr'))     // rejected
console.log(Rr.compute('RRrr'))    // accepted
console.log(Rr.compute('RRRrrr'))  // accepted
console.log(Rr.compute('RrR'))     // rejected
console.log(Rr.compute('RrRr'))    // rejected
console.log(Rr.compute('rrRR'))    // rejected

console.log('\nBalanced parenthesis:')

const balanced = new DPDA([
        new Rule('S', '(', '$', 'X$', 'O'), 
        new Rule('O', '(', 'X', 'XX', 'O'), 
        new Rule('O', ')', 'X', 'ε',  'O'), 
        new Rule('O', 'ε', '$', '$',  'S')
    ], 'S', 'S', 'Rr'
)

console.log(balanced.compute(''))             // accepted
console.log(balanced.compute('()'))           // accepted
console.log(balanced.compute('(())'))         // accepted
console.log(balanced.compute('((()))'))       // accepted
console.log(balanced.compute('()()'))         // accepted
console.log(balanced.compute('(())(())'))     // accepted
console.log(balanced.compute('((())(()))'))   // accepted
console.log(balanced.compute('(((())(())))')) // accepted
console.log(balanced.compute('('))            // rejected
console.log(balanced.compute(')'))            // rejected
console.log(balanced.compute('())'))          // rejected
console.log(balanced.compute('()('))          // rejected
console.log(balanced.compute('(()'))          // rejected
console.log(balanced.compute('(()()'))        // rejected
console.log(balanced.compute('()())'))        // rejected