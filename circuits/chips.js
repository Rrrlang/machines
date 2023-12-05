class NOT {
    exec(a) {
        return ~a & 1
    }
}

class AND {
    exec(a, b) {
        return a & b
    }
}

class OR {
    exec(a, b) {
        return a | b
    }
}

class XOR {
    constructor() {
        this.or = chip(OR)
        this.and = chip(AND)
        this.not = chip(NOT)
    }
    exec(a, b) {
        return this.or(
            this.and(a, this.not(b)),
            this.and(this.not(a), b)
        )
    }
}

class NAND {
    constructor() {
        this.and = chip(AND)
        this.not = chip(NOT)
    }
    exec(a, b) {
        return this.not(this.and(a, b))
    }
}

class NOR {
    constructor() {
        this.or = chip(OR)
        this.not = chip(NOT)
    }
    exec(a, b) {
        return this.not(this.or(a, b))
    }
}

class SRLATCH {
    constructor() {
        this.norS = chip(NOR)
        this.norR = chip(NOR)

        this.outS = 0
        this.outR = 0
    }
    exec(set, reset) {
        this.outS = this.norS(set, this.outR)
        this.outR = this.norR(reset, this.outS)
        return this.outR
    }
}

class DLATCH {
    constructor() {
        this.not = chip(NOT)
        this.and = chip(AND)
        this.srlatch = chip(SRLATCH)
    }
    exec(data, store) {
        const set = this.and(data, store)
        const reset = this.and(store, this.not(data))

        return this.srlatch(set, reset)
    }
}

class DLATCH8 {
    constructor() {
        this.dl7 = chip(DLATCH)
        this.dl6 = chip(DLATCH)
        this.dl5 = chip(DLATCH)
        this.dl4 = chip(DLATCH)
        this.dl3 = chip(DLATCH)
        this.dl2 = chip(DLATCH)
        this.dl1 = chip(DLATCH)
        this.dl0 = chip(DLATCH)
    }
    exec(d7, d6, d5, d4, d3, d2, d1, d0, store) {
        return [
            this.dl7(d7, store),
            this.dl6(d6, store),
            this.dl5(d5, store),
            this.dl4(d4, store),
            this.dl3(d3, store),
            this.dl2(d2, store),
            this.dl1(d1, store),
            this.dl0(d0, store),
        ]
    }
}

class DFF {
    constructor() {
        this.not = chip(NOT)
        this.dlatch1 = chip(DLATCH)
        this.dlatch2 = chip(DLATCH)
    }
    exec(data, clock) {
        return this.dlatch2(
            this.dlatch1(data, this.not(clock)),
            clock
        )
    }
}

class REGISTER {
    constructor() {
        this.mux = chip(MUX)
        this.dff = chip(DFF)
        this.stored = 0
    }
    exec(data, store, clock) {
        return this.stored = this.dff(
            this.mux(this.stored, data, store),
            clock
        )
    }
}

class REGISTER8 {
    constructor() {
        this.reg7 = chip(REGISTER)
        this.reg6 = chip(REGISTER)
        this.reg5 = chip(REGISTER)
        this.reg4 = chip(REGISTER)
        this.reg3 = chip(REGISTER)
        this.reg2 = chip(REGISTER)
        this.reg1 = chip(REGISTER)
        this.reg0 = chip(REGISTER)
    }
    exec(d7, d6, d5, d4, d3, d2, d1, d0, store, clock) {
        return [
            this.reg7(d7, store, clock),
            this.reg6(d6, store, clock),
            this.reg5(d5, store, clock),
            this.reg4(d4, store, clock),
            this.reg3(d3, store, clock),
            this.reg2(d2, store, clock),
            this.reg1(d1, store, clock),
            this.reg0(d0, store, clock),
        ]
    }
}

class REG { // primary-replica data flip-flop (register)
    constructor() {
        this.primary = chip(DLATCH)
        this.replica = chip(DLATCH)
        this.not = chip(NOT)
    }
    exec(data, store) {
        return this.replica(
            this.primary(data, store),
            this.not(store)
        )
    }
}

class REG4 {
    constructor() {
        this.ddl3 = chip(REG)
        this.ddl2 = chip(REG)
        this.ddl1 = chip(REG)
        this.ddl0 = chip(REG)
    }
    exec(d3, d2, d1, d0, store) {
        return [
            this.ddl3(d3, store),
            this.ddl2(d2, store),
            this.ddl1(d1, store),
            this.ddl0(d0, store),
        ]
    }
}

class REG8 {
    constructor() {
        this.ddl7 = chip(REG)
        this.ddl6 = chip(REG)
        this.ddl5 = chip(REG)
        this.ddl4 = chip(REG)
        this.ddl3 = chip(REG)
        this.ddl2 = chip(REG)
        this.ddl1 = chip(REG)
        this.ddl0 = chip(REG)
    }
    exec(d7, d6, d5, d4, d3, d2, d1, d0, store) {
        return [
            this.ddl7(d7, store),
            this.ddl6(d6, store),
            this.ddl5(d5, store),
            this.ddl4(d4, store),
            this.ddl3(d3, store),
            this.ddl2(d2, store),
            this.ddl1(d1, store),
            this.ddl0(d0, store),
        ]
    }
}

class AND8 {
    constructor() {
        this.and7 = chip(AND)
        this.and6 = chip(AND)
        this.and5 = chip(AND)
        this.and4 = chip(AND)
        this.and3 = chip(AND)
        this.and2 = chip(AND)
        this.and1 = chip(AND)
        this.and0 = chip(AND)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0
    ) {
        return [
            this.and7(a7, b7),
            this.and6(a6, b6),
            this.and5(a5, b5),
            this.and4(a4, b4),
            this.and3(a3, b3),
            this.and2(a2, b2),
            this.and1(a1, b1),
            this.and0(a0, b0),
        ]
    }
}

class AND_4 {
    constructor() {
        this.and = chip(AND)
    }
    exec(a, b, c, d) {
        return this.and(
            this.and(a, b),
            this.and(c, d)
        )
    }
}

class AND_5 {
    constructor() {
        this.and = chip(AND)
        this.and_4 = chip(AND_4)
    }
    exec(a, b, c, d, e) {
        return this.and(
            this.and_4(a, b, c, d),
            e
        )
    }
}

class OR4 {
    constructor() {
        this.or = chip(OR)
    }
    exec(
        a3, a2, a1, a0,
        b3, b2, b1, b0
    ) {
        return [
            this.or(a3, b3),
            this.or(a2, b2),
            this.or(a1, b1),
            this.or(a0, b0),
        ]
    }
}

class OR8 {
    constructor() {
        this.or = chip(OR)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0
    ) {
        return [
            this.or(a7, b7),
            this.or(a6, b6),
            this.or(a5, b5),
            this.or(a4, b4),
            this.or(a3, b3),
            this.or(a2, b2),
            this.or(a1, b1),
            this.or(a0, b0),
        ]
    }
}

class OR_4 {
    constructor() {
        this.or = chip(OR)
    }
    exec(a, b, c, d ) {
        return this.or(
            this.or(a, b),
            this.or(c, d)
        )
    }
}

class OR_8 {
    constructor() {
        this.or_2 = chip(OR)
        this.or_4 = chip(OR_4)
    }
    exec(a, b, c, d, e, f, g, h) {
        return this.or_2(
            this.or_4(a, b, c, d),
            this.or_4(e, f, g, h)
        )
    }
}

class OR_16 {
    constructor() {
        this.or_4 = chip(OR_4)
    }
    exec(
        d15, d14, d13, d12, d11, d10, d09, d08, 
        d07, d06, d05, d04, d03, d02, d01, d00
    ) {
        return this.or_4(
            this.or_4(d15, d14, d13, d12), 
            this.or_4(d11, d10, d09, d08),
            this.or_4(d07, d06, d05, d04), 
            this.or_4(d03, d02, d01, d00)
        )
    }
}

class NOT8 {
    constructor() {
        this.not7 = chip(NOT)
        this.not6 = chip(NOT)
        this.not5 = chip(NOT)
        this.not4 = chip(NOT)
        this.not3 = chip(NOT)
        this.not2 = chip(NOT)
        this.not1 = chip(NOT)
        this.not0 = chip(NOT)
    }
    exec(a7, a6, a5, a4, a3, a2, a1, a0) {
        return [
            this.not7(a7),
            this.not6(a6),
            this.not5(a5),
            this.not4(a4),
            this.not3(a3),
            this.not2(a2),
            this.not1(a1),
            this.not0(a0),
        ]
    }
}

class NAND8 {
    constructor() {
        this.nand7 = chip(NAND)
        this.nand6 = chip(NAND)
        this.nand5 = chip(NAND)
        this.nand4 = chip(NAND)
        this.nand3 = chip(NAND)
        this.nand2 = chip(NAND)
        this.nand1 = chip(NAND)
        this.nand0 = chip(NAND)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0
    ) {
        return [
            this.nand7(a7, b7),
            this.nand6(a6, b6),
            this.nand5(a5, b5),
            this.nand4(a4, b4),
            this.nand3(a3, b3),
            this.nand2(a2, b2),
            this.nand1(a1, b1),
            this.nand0(a0, b0),
        ]
    }
}

class NOR8 {
    constructor() {
        this.nor7 = chip(NOR)
        this.nor6 = chip(NOR)
        this.nor5 = chip(NOR)
        this.nor4 = chip(NOR)
        this.nor3 = chip(NOR)
        this.nor2 = chip(NOR)
        this.nor1 = chip(NOR)
        this.nor0 = chip(NOR)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0
    ) {
        return [
            this.nor7(a7, b7),
            this.nor6(a6, b6),
            this.nor5(a5, b5),
            this.nor4(a4, b4),
            this.nor3(a3, b3),
            this.nor2(a2, b2),
            this.nor1(a1, b1),
            this.nor0(a0, b0),
        ]
    }
}

class XOR8 {
    constructor() {
        this.xor7 = chip(XOR)
        this.xor6 = chip(XOR)
        this.xor5 = chip(XOR)
        this.xor4 = chip(XOR)
        this.xor3 = chip(XOR)
        this.xor2 = chip(XOR)
        this.xor1 = chip(XOR)
        this.xor0 = chip(XOR)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0
    ) {
        return [
            this.xor7(a7, b7),
            this.xor6(a6, b6),
            this.xor5(a5, b5),
            this.xor4(a4, b4),
            this.xor3(a3, b3),
            this.xor2(a2, b2),
            this.xor1(a1, b1),
            this.xor0(a0, b0),
        ]
    }
}

class MUX {
    constructor() {
        this.not = chip(NOT)
        this.and = chip(AND)
        this.or = chip(OR)
    }
    exec(op0, op1, select) {
        return this.or(
            this.and(op0, this.not(select)),
            this.and(op1, select)
        )
    }
}

class MUX4 {
    constructor() {
        this.mux3 = chip(MUX)
        this.mux2 = chip(MUX)
        this.mux1 = chip(MUX)
        this.mux0 = chip(MUX)
    }
    exec(
        a3, a2, a1, a0,
        b3, b2, b1, b0,
        select
    ) {
        return [
            this.mux3(a3, b3, select),
            this.mux2(a2, b2, select),
            this.mux1(a1, b1, select),
            this.mux0(a0, b0, select),
        ]
    }
}

class MUX8 {
    constructor() {
        this.mux7 = chip(MUX)
        this.mux6 = chip(MUX)
        this.mux5 = chip(MUX)
        this.mux4 = chip(MUX)
        this.mux3 = chip(MUX)
        this.mux2 = chip(MUX)
        this.mux1 = chip(MUX)
        this.mux0 = chip(MUX)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0,
        select
    ) {
        return [
            this.mux7(a7, b7, select),
            this.mux6(a6, b6, select),
            this.mux5(a5, b5, select),
            this.mux4(a4, b4, select),
            this.mux3(a3, b3, select),
            this.mux2(a2, b2, select),
            this.mux1(a1, b1, select),
            this.mux0(a0, b0, select),
        ]
    }
}

class MUX_4 {
    constructor() {
        this.not = chip(NOT)
        this.and = chip(AND)
        this.or_4 = chip(OR_4)
    }
    exec(a, b, c, d, s1, s0) {
        const s0_ = this.not(s0)
        const s1_ = this.not(s1)
        return this.or_4(
            this.and(
                s0_,
                this.and(s1_, a)
            ),
            this.and(
                s0,
                this.and(s1_, b)
            ),
            this.and(
                s0_,
                this.and(s1, c)
            ),
            this.and(
                s0,
                this.and(s1, d)
            )            
        )
    }
}

class MUX_16 {
    constructor() {
        this.not = chip(NOT)
        this.and_5 = chip(AND_5)
        this.or_16 = chip(OR_16)
    }
    exec(
        d15, d14, d13, d12, d11, d10, d09, d08, 
        d07, d06, d05, d04, d03, d02, d01, d00, 
        s3, s2, s1, s0
    ) {
        const s0_ = this.not(s0)
        const s1_ = this.not(s1)
        const s2_ = this.not(s2)
        const s3_ = this.not(s3)
        return this.or_16(
            this.and_5(d15, s3_, s2_, s1_, s0_),
            this.and_5(d14, s3_, s2_, s1_, s0),
            this.and_5(d13, s3_, s2_, s1, s0_),
            this.and_5(d12, s3_, s2_, s1, s0),
            this.and_5(d11, s3_, s2, s1_, s0_),
            this.and_5(d10, s3_, s2, s1_, s0),
            this.and_5(d09, s3_, s2, s1, s0_),
            this.and_5(d08, s3_, s2, s1, s0),
            this.and_5(d07, s3, s2_, s1_, s0_),
            this.and_5(d06, s3, s2_, s1_, s0),
            this.and_5(d05, s3, s2_, s1, s0_),
            this.and_5(d04, s3, s2_, s1, s0),
            this.and_5(d03, s3, s2, s1_, s0_),
            this.and_5(d02, s3, s2, s1_, s0),
            this.and_5(d01, s3, s2, s1, s0_),
            this.and_5(d00, s3, s2, s1, s0),
        )
    }
}

class MUX4_4 {
    constructor() {
        this.mux = chip(MUX_4)
    }
    exec(
        a3, a2, a1, a0,
        b3, b2, b1, b0,
        c3, c2, c1, c0,
        d3, d2, d1, d0,
        s1, s0
    ) {
        return [
            this.mux(a3, b3, c3, d3, s1, s0),
            this.mux(a2, b2, c2, d2, s1, s0),
            this.mux(a1, b1, c1, d1, s1, s0),
            this.mux(a0, b0, c0, d0, s1, s0),
        ]
    }
}

class MUX8_4 {
    constructor() {
        this.mux = chip(MUX_4)
    }
    exec(
        a7, a6, a5, a4, a3, a2, a1, a0,
        b7, b6, b5, b4, b3, b2, b1, b0,
        c7, c6, c5, c4, c3, c2, c1, c0,
        d7, d6, d5, d4, d3, d2, d1, d0,
        s1, s0
    ) {
        return [
            this.mux(a7, b7, c7, d7, s1, s0),
            this.mux(a6, b6, c6, d6, s1, s0),
            this.mux(a5, b5, c5, d5, s1, s0),
            this.mux(a4, b4, c4, d4, s1, s0),
            this.mux(a3, b3, c3, d3, s1, s0),
            this.mux(a2, b2, c2, d2, s1, s0),
            this.mux(a1, b1, c1, d1, s1, s0),
            this.mux(a0, b0, c0, d0, s1, s0),
        ]
    }
}

class MUX8_16 {
    constructor() {
        this.mux = chip(MUX_16)
    }
    exec(
        d15_7, d15_6, d15_5, d15_4, d15_3, d15_2, d15_1, d15_0,
        d14_7, d14_6, d14_5, d14_4, d14_3, d14_2, d14_1, d14_0,
        d13_7, d13_6, d13_5, d13_4, d13_3, d13_2, d13_1, d13_0,
        d12_7, d12_6, d12_5, d12_4, d12_3, d12_2, d12_1, d12_0,
        d11_7, d11_6, d11_5, d11_4, d11_3, d11_2, d11_1, d11_0,
        d10_7, d10_6, d10_5, d10_4, d10_3, d10_2, d10_1, d10_0,
        d09_7, d09_6, d09_5, d09_4, d09_3, d09_2, d09_1, d09_0,
        d08_7, d08_6, d08_5, d08_4, d08_3, d08_2, d08_1, d08_0,
        d07_7, d07_6, d07_5, d07_4, d07_3, d07_2, d07_1, d07_0,
        d06_7, d06_6, d06_5, d06_4, d06_3, d06_2, d06_1, d06_0,
        d05_7, d05_6, d05_5, d05_4, d05_3, d05_2, d05_1, d05_0,
        d04_7, d04_6, d04_5, d04_4, d04_3, d04_2, d04_1, d04_0,
        d03_7, d03_6, d03_5, d03_4, d03_3, d03_2, d03_1, d03_0,
        d02_7, d02_6, d02_5, d02_4, d02_3, d02_2, d02_1, d02_0,
        d01_7, d01_6, d01_5, d01_4, d01_3, d01_2, d01_1, d01_0,
        d00_7, d00_6, d00_5, d00_4, d00_3, d00_2, d00_1, d00_0,
        s3, s2, s1, s0
    ) {
        return [
            this.mux(d15_7, d14_7, d13_7, d12_7, d11_7, d10_7, d09_7, d08_7, d07_7, d06_7, d05_7, d04_7, d03_7, d02_7, d01_7, d00_7, s3, s2, s1, s0),
            this.mux(d15_6, d14_6, d13_6, d12_6, d11_6, d10_6, d09_6, d08_6, d07_6, d06_6, d05_6, d04_6, d03_6, d02_6, d01_6, d00_6, s3, s2, s1, s0),
            this.mux(d15_5, d14_5, d13_5, d12_5, d11_5, d10_5, d09_5, d08_5, d07_5, d06_5, d05_5, d04_5, d03_5, d02_5, d01_5, d00_5, s3, s2, s1, s0),
            this.mux(d15_4, d14_4, d13_4, d12_4, d11_4, d10_4, d09_4, d08_4, d07_4, d06_4, d05_4, d04_4, d03_4, d02_4, d01_4, d00_4, s3, s2, s1, s0),
            this.mux(d15_3, d14_3, d13_3, d12_3, d11_3, d10_3, d09_3, d08_3, d07_3, d06_3, d05_3, d04_3, d03_3, d02_3, d01_3, d00_3, s3, s2, s1, s0),
            this.mux(d15_2, d14_2, d13_2, d12_2, d11_2, d10_2, d09_2, d08_2, d07_2, d06_2, d05_2, d04_2, d03_2, d02_2, d01_2, d00_2, s3, s2, s1, s0),
            this.mux(d15_1, d14_1, d13_1, d12_1, d11_1, d10_1, d09_1, d08_1, d07_1, d06_1, d05_1, d04_1, d03_1, d02_1, d01_1, d00_1, s3, s2, s1, s0),
            this.mux(d15_0, d14_0, d13_0, d12_0, d11_0, d10_0, d09_0, d08_0, d07_0, d06_0, d05_0, d04_0, d03_0, d02_0, d01_0, d00_0, s3, s2, s1, s0),
        ]
    }
}

class EZ {
    constructor() {
        this.or = chip(OR_8)
        this.not = chip(NOT)
    }
    exec(a7, a6, a5, a4, a3, a2, a1, a0) {
        return this.not(this.or(a7, a6, a5, a4, a3, a2, a1, a0))
    }
}

class CLK {
    constructor() {
        this.current = 0
    }
    exec() {
        const c = this.current
        this.current = this.current ? 0 : 1
        return c
    }
}

class HALFADDER {
    constructor() {
        this.xor = chip(XOR)
        this.and = chip(AND)
    }
    exec(a, b) {
        return [
            this.xor(a, b),
            this.and(a, b),
        ]
    }
}

class FULLADDER {
    constructor() {
        this.ha = chip(HALFADDER)
        this.or = chip(OR)
    }
    exec(a, b, carry) {
        const x = this.ha(a, b)
        const y = this.ha(carry, x[0])
        return [
            y[0], 
            this.or(x[1], y[1])
        ]
    }
}

class INC {
    constructor() {
        this.ha = chip(HALFADDER)
    }
    exec(a7, a6, a5, a4, a3, a2, a1, a0) {
        const o0 = this.ha(a0, 1)
        const o1 = this.ha(a1, o0[1])
        const o2 = this.ha(a2, o1[1])
        const o3 = this.ha(a3, o2[1])
        const o4 = this.ha(a4, o3[1])
        const o5 = this.ha(a5, o4[1])
        const o6 = this.ha(a6, o5[1])
        const o7 = this.ha(a7, o6[1])
        return [o7[0], o6[0], o5[0], o4[0], o3[0], o2[0], o1[0], o0[0]]
    }
}

class INC4 {
    constructor() {
        this.ha = chip(HALFADDER)
    }
    exec(a3, a2, a1, a0) {
        const o0 = this.ha(a0, 1)
        const o1 = this.ha(a1, o0[1])
        const o2 = this.ha(a2, o1[1])
        const o3 = this.ha(a3, o2[1])
        return [o3[0], o2[0], o1[0], o0[0]]
    }
}

class DEC {
    constructor() {
        this.fa = chip(FULLADDER)
    }
    exec(a7, a6, a5, a4, a3, a2, a1, a0) {
        const o0 = this.fa(a0, 1, 0)
        const o1 = this.fa(a1, 1, o0[1])
        const o2 = this.fa(a2, 1, o1[1])
        const o3 = this.fa(a3, 1, o2[1])
        const o4 = this.fa(a4, 1, o3[1])
        const o5 = this.fa(a5, 1, o4[1])
        const o6 = this.fa(a6, 1, o5[1])
        const o7 = this.fa(a7, 1, o6[1])
        return [o7[0], o6[0], o5[0], o4[0], o3[0], o2[0], o1[0], o0[0]]
    }
}

class DUAL_EDGE_DFF {
    constructor() {
        this.dl1 = chip(DLATCH)
        this.dl2 = chip(DLATCH)
        this.not = chip(NOT)
        this.mux = chip(MUX)
    }
    exec(data, clock) {
        return this.mux(
            this.dl2(data, clock),
            this.dl1(data, this.not(clock)),
            clock
        )
    }
}

class DUAL_EDGE_DFF4 {
    constructor() {
        this.dedff3 = chip(DUAL_EDGE_DFF)
        this.dedff2 = chip(DUAL_EDGE_DFF)
        this.dedff1 = chip(DUAL_EDGE_DFF)
        this.dedff0 = chip(DUAL_EDGE_DFF)
    }
    exec(d3, d2, d1, d0, clock) {
        return [
            this.dedff3(d3, clock),
            this.dedff2(d2, clock),
            this.dedff1(d1, clock),
            this.dedff0(d0, clock),
        ]
    }
}

function chip(chipClass) {
    const chip = new chipClass()
    return chip.exec.bind(chip)
}

module.exports = {
    AND, OR, NOT, NAND, NOR, XOR,
    SRLATCH, DLATCH, DLATCH8, DFF, REG, REG4, REG8,
    REGISTER, REGISTER8, DUAL_EDGE_DFF, DUAL_EDGE_DFF4,
    MUX, MUX4, MUX8, MUX_4, MUX_16, MUX4_4, MUX8_4, MUX8_16,
    CLK,
    AND_4, AND_5, OR_4, OR_8, OR_16,
    AND8, OR4, OR8, NOT8, NAND8, NOR8, XOR8,
    EZ, HALFADDER, FULLADDER, INC, INC4, DEC,
    chip,
}