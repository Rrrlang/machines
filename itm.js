/** Inductive Turing Machine */

class Tape {

    constructor(input) {
        this.mem = []
        if (input) Array.from(input)
            .forEach((v, i) => this.mem[i] = v)
    }

    read(pos) {
        const s = this.mem[pos]
        return s ? s : 'ε'
    }

    write(pos, symbol) {
        this.mem[pos] = symbol
    }

    output() {
        const keys = Object.keys(this.mem)
            .sort((a, b) => a - b)
            
        let out = ''
        for (let i = Math.min(...keys); 
                 i < Math.max(...keys) + 1; i++) {
            const s = this.mem[i]
            out += s && s !== 'ε' ? s : ' '
        }
        return out.trim()
    }
}

class Head {

    constructor(tape) {
        this.tape = tape
        this.pos = 0    
    }

    read() {
        return this.tape.read(this.pos)
    }

    write(symbol) {
        this.tape.write(this.pos, symbol)
    }

    move(direction) {
        if ('<' === direction) this.pos--
        if ('>' === direction) this.pos++
    }
}

class Control {

    constructor(rules) {
        this.rules = rules 
        this.state = rules[0].state // initialize with the first state       
    }

    next(read) {
        const rule = this.rules.find(r =>
            r.state === this.state && 
            r.read === read)

        if (!rule) return null

        this.state = rule.next
        
        return rule
    }
}

class Rule {

    constructor(q, r, w, m, qn) {
        this.state = q
        this.read = r
        this.write = w
        this.move = m
        this.next = qn
    }
}

class DescNumber {

    constructor(dn) {
        this.dn = dn
    }

    parse(
        alphabet = ['ε', 'R', 'r'],
        numeral = 'r',
        separator = 'R',
        moves = ['<', '>']
    ) {
        const rules = []
        let qtuplet = ''
        let elCount = 0

        for (let i = 0; i < this.dn.length; i++) {
            const s = this.dn[i]
            if (s !== numeral && s !== separator)
                throw new Error('Invalid DN ' + s)

            qtuplet += s

            if (separator === s) elCount++
            if (elCount % 5 === 0 &&
                elCount > 0 ||
                i === this.dn.length - 1
            ) {
                const qt = qtuplet.split(separator)
                const rule = new Rule(
                    'q' + (qt[0].length - 1),
                    alphabet[qt[1].length - 1],
                    alphabet[qt[2].length - 1],
                    moves[qt[3].length - 1],
                    'q' + (qt[4].length - 1)
                )
                rules.push(rule)
                qtuplet = ''
                elCount = 0
            }
        }
        return rules
    }
}

class InductiveTM {

    constructor(dn, input, alphabet) {
        this.tape = new Tape(input)
        this.head = new Head(this.tape)
        this.control = new Control(
            new DescNumber(dn).parse(alphabet))
        this.maxSteps = 1000
    }

    compute() {
        let steps = 0
        let limitReached = false
        let next
        while ((next = this.control.next(this.head.read()))) {

            this.head.write(next.write)
            this.head.move(next.move)

            if (++steps >= this.maxSteps) {
                limitReached = true
                break
            }
        }
        
        return limitReached ? 0 : 1
    }

    state() {
        return this.control.state
    }
}

const dn = new DescNumber('rRrRrrRrrRrrRrrRrrRrRrrRr')
console.log(dn.parse())

// flip r->R, R->r
const tm1 = new InductiveTM(
    'rRrRrrRrrRrrRrrRrrRrRrrRr', 
    'RrRrRr',
    ['R', 'r'])
console.log(tm1.compute())

// compute RrrRrrRrr...
const tm2 = new InductiveTM(
    'rRrRrrRrrRrrRrrRrRrrrRrrRrrrRrrrRrRrrrRrrRr')
console.log(tm2.compute())

// compute an infinite loop
const tm3 = new InductiveTM(
    'rRrRrRrrRrrRrrRrRrRrRr')
console.log(tm3.compute())
