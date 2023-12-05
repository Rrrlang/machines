const { MUX4, MUX8, MUX4_4, MUX8_4, DLATCH8, REG4, INC, INC4, DEC, EZ, AND, NOT, OR, OR4, chip } = require('./chips')

class CPU {
    constructor() {
        // registers
        this.instr = chip(DLATCH8)  // holds the currect 8bit instruction
        this.pc = chip(REG4)        // program counter; holds the 4bit address of the currect instruction

        // buses
        this.muxA1 = chip(MUX4)   // address multiplexers
        this.muxA2 = chip(MUX4)
        this.muxC = chip(MUX4_4)  // counter multiplexer
        this.muxD = chip(MUX8_4)  // data multiplexer
        this.muxJzdec = chip(MUX8)
        
        // reusable components
        this.and = chip(AND)
        this.not = chip(NOT)
        this.or = chip(OR)
        this.or4 = chip(OR4)
        this.inc = chip(INC)
        this.inc4 = chip(INC4)
        this.dec = chip(DEC)
        this.ez = chip(EZ)

        // for the loop
        this.currPc = [0, 0, 0, 0]  // address of the current instruction
    }
    // returns [
    //   a3, a2, a1, a0, // address
    //   d7, d6, d5, d4, d3, d2, d1, d0, // data 
    // ]
    exec(
        d7, d6, d5, d4, d3, d2, d1, d0, // data/instruction 
        clock   // fetch(0)/exec(1)
    ) {
        const clock_ = this.not(clock) // inverted

        // get the current instruction
        const instr = this.instr(
            d7, d6, d5, d4, d3, d2, d1, d0, 
            clock_
        )

        // compute data for JZDEC operation
        const ez = this.ez(d7, d6, d5, d4, d3, d2, d1, d0)
        const do_jump = this.and(ez, instr[0])  // equals zero and op is JZDEC
        const data_jzdec = this.muxJzdec( // if equals zero, select the current value (which is zero) or decremented value otherwise
            ...this.dec(d7, d6, d5, d4, d3, d2, d1, d0), // decrement
            d7, d6, d5, d4, d3, d2, d1, d0, // must be 0, 0, 0, 0, 0, 0, 0, 0
            ez
        )
                
        // update the counter
        const i1 = this.or(instr[1], this.and(instr[0], do_jump))
        const pc = this.muxC(
            ...this.currPc, // for HALT no update
            ...this.inc4(...this.currPc),   // next (pc+1) for INC
            ...this.inc4(...this.currPc),   // next (pc+1) for JZDEC if not zero
            0, instr[5], instr[6], instr[7], // jump address in instruction has only 3 bits; align to 4 bits
            instr[0], i1
        )
        this.currPc = this.pc(...pc, clock) // update loop on exec

        // compute new output data
        const data = this.muxD(
            d7, d6, d5, d4, d3, d2, d1, d0, // for HALT no update
            ...this.inc(d7, d6, d5, d4, d3, d2, d1, d0), // increment data for INC
            ...data_jzdec,  // for JZDEC
            0, 0, 0, 0, 0, 0, 0, 0, // no 4th value
            instr[0], instr[1]  // op; 00: halt, 01: inc, 10: jzdec
        )
        
        // compute output address
        const a = this.muxA1(
            ...pc, // instruction address
            0, instr[2], instr[3], instr[4], // data address in instruction has only 3 bits; align to 4 bits
            clock_
        )
        const address = this.muxA2(  // data start with 8th register
            ...a,   // instructions span from 0th to 7th register
            ...this.or4(...a, 1, 0, 0, 0),   // add 8 to data address
            clock_
        )

        return [...address, ... data]
    }
}

module.exports = CPU