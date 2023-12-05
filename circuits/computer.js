const { CLK, DUAL_EDGE_DFF4, MUX4, NOT, chip } = require('./chips')
const MEM = require('./memory')
const CPU = require('./cpu')

class COMPUTER {
    constructor(program) {
        this.clock = chip(CLK)
        this.mem = chip(MEM)
        this.cpu = chip(CPU)
        
        this.addr = chip(DUAL_EDGE_DFF4)

        this.storeProgram(program)
    }
    compute(maxSteps = 10) {
        // initial values
        let data = [0, 0, 0, 0, 0, 0, 0, 0]
        let addr = [0, 0, 0, 0]

        let steps = 0
        while (steps++ < maxSteps) {
            const clock = this.clock()

            // triggered by clock
            data = this.mem(...this.addr(...addr, clock), ...data, clock)
            
            const out = this.cpu(...data, clock)            
            addr = out.slice(0, 4)
            data = out.slice(4)
            
            // triggered by addr/data update
            data = this.mem(...this.addr(...addr, clock), ...data, clock)
        }
    }

    storeProgram(code) {
        code = code
            .replaceAll(/\/\/([^\r\n]*)/gsm, '') // remove comments
            .replaceAll(/[^01]/g, '')            // clean up all except 0 and 1
            .split('')                           // to array
        const size = code.length
        for (let i = 0; i < size; i += 8) {
            const addr = toBinary(i / 8)
            const instr = code.slice(i, i + 8)
            this.mem(...addr, ...instr, 1)
        }
    }

    printData() {
        let res = ''
        for (let i = 8; i < 16; i++) {
            const a = toBinary(i)
            const v = this.mem(...a).join('')
            res += a.splice(1).join('') + ': ' + v + ' (' + parseInt(v, 2) + ')\n'
        }
        return res
    }
}

/** Return an array of zero and ones */
function toBinary(n, size = 4) {
    const arr = n.toString(2).split('').map(i => i-0)
    while (arr.length < size) arr.unshift(0)
    return arr
}

module.exports = COMPUTER