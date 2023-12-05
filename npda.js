/** Non-deterministic Push-Down Automaton */

class NPDA {

    constructor(rules, init, ...accept) {
        this.rules = rules
        this.init = init
        this.accept = accept
    }

    compute(input) {
        return this._compute(
                this.init, input, 0, new Stack()) 
            ? 'accepted' : 'rejected'
    }

    _compute(state, input, i, stack) {
        if (i >= input.length && 
            this.accept.includes(state)
        ) return true

        const symbol = input[i]
        const top = stack.peek()

        // find all applicable rules
        const rules = this.rules.filter(r => 
            r.state === state && (
            r.read === symbol || r.read === 'ε') && (
            r.pop === top || r.pop === 'ε'))
        
        // check the rules recursively
        for (const r of rules) {

            // copy the current stack
            const s = new Stack(stack.store)
            if (r.pop  !== 'ε') s.pop()
            if (r.push !== 'ε') s.push(r.push)

            if (this._compute(
                r.next, 
                input, 
                r.read !== 'ε' && i < input.length 
                    ? i + 1 : i,
                s)
            ) return true
        }
        return false
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

const Rr = new NPDA([
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

const balanced = new NPDA([
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

console.log('\nPalindromes:')

const pal = new NPDA([
        new Rule('S', 'R', '$', 'X$', 'L'), 
        new Rule('S', 'r', '$', 'Y$', 'L'), 

        new Rule('L', 'R', 'X', 'XX', 'L'), 
        new Rule('L', 'R', 'Y', 'XY', 'L'), 
        new Rule('L', 'r', 'X', 'YX', 'L'), 
        new Rule('L', 'r', 'Y', 'YY', 'L'), 

        new Rule('L', 'ε', 'ε', 'ε', 'R'), 
        new Rule('L', 'R', 'ε', 'ε', 'R'), 
        new Rule('L', 'r', 'ε', 'ε', 'R'),

        new Rule('R', 'R', 'X', 'ε', 'R'), 
        new Rule('R', 'r', 'Y', 'ε', 'R'), 

        new Rule('R', 'ε', '$', '$', 'OK')
    ], 'S', 'OK'
)

console.log(pal.compute(''))          // rejected
console.log(pal.compute('R'))         // rejected
console.log(pal.compute('r'))         // rejected
console.log(pal.compute('rR'))        // rejected
console.log(pal.compute('Rr'))        // rejected
console.log(pal.compute('Rrr'))       // rejected
console.log(pal.compute('RRrr'))      // rejected
console.log(pal.compute('RR'))        // accepted
console.log(pal.compute('rr'))        // accepted
console.log(pal.compute('RrR'))       // accepted
console.log(pal.compute('rRr'))       // accepted
console.log(pal.compute('rrRrr'))     // accepted
console.log(pal.compute('RrrR'))      // accepted
console.log(pal.compute('RRrrRrrRR')) // accepted