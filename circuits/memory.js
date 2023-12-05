const { REG8, MUX8_16, MUX_16, chip } = require('./chips')

class MEMORY {
    constructor() {
        this.reg15 = chip(REG8)
        this.reg14 = chip(REG8)
        this.reg13 = chip(REG8)
        this.reg12 = chip(REG8)
        this.reg11 = chip(REG8)
        this.reg10 = chip(REG8)
        this.reg09 = chip(REG8)
        this.reg08 = chip(REG8)
        this.reg07 = chip(REG8)
        this.reg06 = chip(REG8)
        this.reg05 = chip(REG8)
        this.reg04 = chip(REG8)
        this.reg03 = chip(REG8)
        this.reg02 = chip(REG8)
        this.reg01 = chip(REG8)
        this.reg00 = chip(REG8)
        this.muxD = chip(MUX8_16) // select data from a register at the address
        this.muxS = chip(MUX_16)  // select store flag for a register at the address
    }
    exec(
        a3, a2, a1, a0, // address
        d7, d6, d5, d4, d3, d2, d1, d0, // data        
        s // store
    ) {
        return this.muxD(
            ...this.reg15(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg14(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg13(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg12(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg11(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg10(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg09(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg08(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg07(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg06(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg05(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg04(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg03(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, a3, a2, a1, a0)),
            ...this.reg02(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, a3, a2, a1, a0)),
            ...this.reg01(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, a3, a2, a1, a0)),
            ...this.reg00(d7, d6, d5, d4, d3, d2, d1, d0,
                this.muxS(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s, a3, a2, a1, a0)),
            a3, a2, a1, a0)
    }
}

module.exports = MEMORY