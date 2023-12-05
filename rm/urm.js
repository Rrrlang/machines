class URM {
    constructor(program, input = []) {
        this.program = this.parse(program)
        this.reg = input
        // special working registers
        this.reg['P'] = 0   // program pointer
        this.reg['p'] = 'P'
        this.reg['A'] = 0   // accumulator 1
        this.reg['a'] = 'A'
        this.reg['B'] = 0   // accumulator 2
        this.reg['b'] = 'B'
        this.reg['B'] = 0   // accumulator 3
        this.reg['c'] = 'C'
        this.reg['Z'] = 0   // zero
        this.reg['z'] = 'Z'
        this.reg['C1'] = 1  // one
        this.reg['c1'] = 'C1'
        this.reg['C2'] = 2  // two
        this.reg['c2'] = 'C2'
    }

    compute() {
        let i = this.program[0]
        while (i) {
            i = this.execute(i)
        }
        return this.output()
    }

    execute(instr) {
        let p, addr, next
        switch (instr.id) {
            case 'INC':
                // indirection
                p = instr.args[0]
                addr = this.reg[p]
                this.reg[addr] 
                    ? this.reg[addr]++
                    : this.reg[addr] = 1
                next = instr.args[1] - 0
                return this.program[next]

            case 'JZDEC':
                // indirection
                p = instr.args[0]
                addr = this.reg[p]
                if (!this.reg[addr])
                    next = instr.args[1] - 0
                else {
                    this.reg[addr]--
                    next = instr.args[2] - 0
                }
                return this.program[next]

            case 'HALT':
                return null

            default:
                throw new Error('Unknown instruction ' + instr.id)
        }
    }

    output() {
        const keys = Object.keys(this.reg)
            .filter(k => Number.isInteger(k - 0))
            .sort((a, b) => a - b)
        
        return keys.map(k => this.reg[k]).join(' ')
    }
    
    parse(program) {
        const instructions = []
        program
            .split(/\r?\n/)
            .map(i => i.trim())
            .filter(i => !!i)
            .map(i => i.split(/\s+/))
            .forEach(i => {
                const label = i[0] - 0
                instructions[label] = 
                    new Instruction(
                        label, i[1], ...i.slice(2))
            })
        return instructions
    }
}

class Instruction {
    constructor(label, id, ...args) {
        this.label = label // for debugging
        this.id = id
        this.args = args
    }
}

module.exports = URM