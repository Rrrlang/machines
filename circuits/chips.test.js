const {
    AND, OR, NOT, NAND, NOR, XOR,
    SRLATCH, DLATCH, DLATCH8, DFF, REG, REG4, REG8,
    REGISTER, REGISTER8, DUAL_EDGE_DFF, DUAL_EDGE_DFF4,
    MUX, MUX4, MUX8, MUX_4, MUX_16, MUX4_4, MUX8_4, MUX8_16,
    AND_4, AND_5, OR_4, OR_8, OR_16,
    AND8, OR4, OR8, NOT8, NAND8, NOR8, XOR8,
    CLK,
    EZ, HALFADDER, FULLADDER, INC, INC4, DEC,
} = require('./chips')

test('AND', () => {
    expect(new AND().exec(0, 0)).toBe(0)
    expect(new AND().exec(0, 1)).toBe(0)
    expect(new AND().exec(1, 0)).toBe(0)
    expect(new AND().exec(1, 1)).toBe(1)
})

test('OR', () => {
    expect(new OR().exec(0, 0)).toBe(0)
    expect(new OR().exec(0, 1)).toBe(1)
    expect(new OR().exec(1, 0)).toBe(1)
    expect(new OR().exec(1, 1)).toBe(1)
})

test('NOT', () => {
    expect(new NOT().exec(0)).toBe(1)
    expect(new NOT().exec(1)).toBe(0)
})

test('NAND', () => {
    expect(new NAND().exec(0, 0)).toBe(1)
    expect(new NAND().exec(0, 1)).toBe(1)
    expect(new NAND().exec(1, 0)).toBe(1)
    expect(new NAND().exec(1, 1)).toBe(0)
})

test('NOR', () => {
    expect(new NOR().exec(0, 0)).toBe(1)
    expect(new NOR().exec(0, 1)).toBe(0)
    expect(new NOR().exec(1, 0)).toBe(0)
    expect(new NOR().exec(1, 1)).toBe(0)
})

test('XOR', () => {
    expect(new XOR().exec(0, 0)).toBe(0)
    expect(new XOR().exec(0, 1)).toBe(1)
    expect(new XOR().exec(1, 0)).toBe(1)
    expect(new XOR().exec(1, 1)).toBe(0)
})

test('SET-RESET LATCH', () => {
    expect(new SRLATCH().exec(0, 0)).toBe(0)
    expect(new SRLATCH().exec(0, 1)).toBe(0)
    expect(new SRLATCH().exec(1, 0)).toBe(1)
    expect(new SRLATCH().exec(1, 1)).toBe(0)

    const srlatch = new SRLATCH()
    expect(srlatch.exec(1, 0)).toBe(1)  // set
    expect(srlatch.exec(0, 0)).toBe(1)  // set remembered
    expect(srlatch.exec(0, 0)).toBe(1)  // set remembered
    expect(srlatch.exec(0, 1)).toBe(0)  // reset
    expect(srlatch.exec(0, 0)).toBe(0)  // reset remembered
    expect(srlatch.exec(0, 0)).toBe(0)  // reset remembered
    expect(srlatch.exec(1, 0)).toBe(1)  // set again
    expect(srlatch.exec(0, 0)).toBe(1)  // set remembered
    expect(srlatch.exec(0, 0)).toBe(1)  // set remembered
})

test('DATA LATCH', () => {
    expect(new DLATCH().exec(0, 0)).toBe(0)
    expect(new DLATCH().exec(0, 1)).toBe(0)
    expect(new DLATCH().exec(1, 0)).toBe(0)
    expect(new DLATCH().exec(1, 1)).toBe(1)

    const dlatch = new DLATCH()
    expect(dlatch.exec(1, 1)).toBe(1)  // store 1
    expect(dlatch.exec(0, 0)).toBe(1)  // 1 remembered
    expect(dlatch.exec(0, 0)).toBe(1)  // 1 remembered
    expect(dlatch.exec(1, 0)).toBe(1)  // 1 remembered
    expect(dlatch.exec(0, 0)).toBe(1)  // 1 remembered
    expect(dlatch.exec(0, 1)).toBe(0)  // store 0
    expect(dlatch.exec(0, 0)).toBe(0)  // 0 remembered
    expect(dlatch.exec(1, 0)).toBe(0)  // 0 remembered
    expect(dlatch.exec(1, 1)).toBe(1)  // store 1
    expect(dlatch.exec(0, 0)).toBe(1)  // 1 remembered
})

test('8BIT DATA LATCH', () => {
    expect(new DLATCH8().exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(new DLATCH8().exec(0, 0, 0, 0, 0, 0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(new DLATCH8().exec(1, 0, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(new DLATCH8().exec(1, 0, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])

    const dlatch = new DLATCH8()
    expect(dlatch.exec(1, 0, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // store 129
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // 129 remembered
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // 129 remembered
    expect(dlatch.exec(1, 0, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // 129 remembered
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // 129 remembered
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])  // store 0
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])  // 0 remembered
    expect(dlatch.exec(1, 0, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])  // 0 remembered
    expect(dlatch.exec(1, 0, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // store 129
    expect(dlatch.exec(0, 0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1])  // 129 remembered
})

test('DATA FLIP-FLOP', () => {
    const dff = new DFF()
    // when clock is low (0), data is set as next
    // when clock is high (1), next is stored 
    expect(dff.exec(1, 0)).toBe(0)  // clock low; set next to 1
    expect(dff.exec(1, 1)).toBe(1)  // clock high => store 1
    expect(dff.exec(0, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(dff.exec(0, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(dff.exec(0, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(0, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(dff.exec(1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(dff.exec(0, 1)).toBe(1)  // clock high => store 1
    expect(dff.exec(0, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(dff.exec(0, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(dff.exec(0, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(0, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(dff.exec(0, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(dff.exec(0, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(dff.exec(1, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(0, 1)).toBe(0)  // clock high => store 1
    expect(dff.exec(0, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(dff.exec(1, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(1, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(0, 1)).toBe(0)  // clock high => store 0
    expect(dff.exec(1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(dff.exec(0, 1)).toBe(1)  // clock high => store 1
})

test('DELAYED DATA LATCH', () => {
    const reg = new REG()
    expect(reg.exec(1, 1)).toBe(0)
    expect(reg.exec(0, 0)).toBe(1)
    expect(reg.exec(0, 1)).toBe(1)
    expect(reg.exec(0, 0)).toBe(0)
    expect(reg.exec(0, 0)).toBe(0)
    expect(reg.exec(0, 1)).toBe(0)
    expect(reg.exec(1, 0)).toBe(0)
    expect(reg.exec(0, 1)).toBe(0) // store 0
    expect(reg.exec(1, 1)).toBe(0) // store 1
    expect(reg.exec(0, 0)).toBe(1) // remembered 1
    expect(reg.exec(0, 1)).toBe(1) // store 0
    expect(reg.exec(0, 1)).toBe(1) // store 0
    expect(reg.exec(0, 0)).toBe(0) // remembered 0
    expect(reg.exec(0, 0)).toBe(0) // remembered 0
})

test('4BIT DELAYED DATA LATCH', () => {
    const ddl = new REG4()
    expect(ddl.exec(1, 1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0]) // 0 initially
    expect(ddl.exec(1, 1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0]) // store 15
    expect(ddl.exec(0, 0, 0, 0, 0)).toStrictEqual([1, 1, 1, 1]) // remembered 15
    expect(ddl.exec(1, 1, 1, 1, 1)).toStrictEqual([1, 1, 1, 1]) // store 15
    expect(ddl.exec(0, 1, 1, 0, 1)).toStrictEqual([1, 1, 1, 1]) // store 6
    expect(ddl.exec(1, 1, 1, 1, 0)).toStrictEqual([0, 1, 1, 0]) // remembered 6
    expect(ddl.exec(1, 1, 1, 1, 1)).toStrictEqual([0, 1, 1, 0]) // store 15
    expect(ddl.exec(1, 1, 1, 1, 1)).toStrictEqual([0, 1, 1, 0]) // store 15
    expect(ddl.exec(1, 1, 1, 1, 0)).toStrictEqual([1, 1, 1, 1]) // remembered 15
    expect(ddl.exec(1, 1, 1, 1, 0)).toStrictEqual([1, 1, 1, 1]) // remembered 15
})

test('8BIT DELAYED DATA LATCH', () => {
    const ddl = new REG8()
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // 0 initially
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // store 15
    expect(ddl.exec(1, 1, 1, 1, 0, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]) // remembered 15
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]) // store 15
    expect(ddl.exec(1, 1, 1, 1, 0, 0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]) // store 240
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 0)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0]) // remembered 240
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 1)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0]) // store 15
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 1)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0]) // store 15
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]) // remembered 15
    expect(ddl.exec(0, 0, 0, 0, 1, 1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]) // remembered 15
})

test('1BIT REGISTER', () => {
    const reg = new REGISTER()
    // store is on
    expect(reg.exec(1, 1, 0)).toBe(0)  // clock low; set next to 1
    expect(reg.exec(1, 1, 1)).toBe(1)  // clock high => store 1
    expect(reg.exec(0, 1, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(reg.exec(0, 1, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(0, 1, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(reg.exec(1, 1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(reg.exec(0, 1, 1)).toBe(1)  // clock high => store 1
    expect(reg.exec(0, 1, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(reg.exec(0, 1, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(0, 1, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(1, 1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(reg.exec(0, 1, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(reg.exec(1, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 1
    expect(reg.exec(0, 1, 0)).toBe(0)  // 0 remembered; set next to 0
    expect(reg.exec(1, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(1, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(1, 1, 0)).toBe(0)  // 0 remembered; set next to 1
    expect(reg.exec(0, 1, 1)).toBe(1)  // clock high => store 1
    // store is off
    expect(reg.exec(0, 0, 0)).toBe(1)
    expect(reg.exec(1, 0, 1)).toBe(1)
    expect(reg.exec(0, 0, 0)).toBe(1)
    expect(reg.exec(0, 0, 0)).toBe(1)
    expect(reg.exec(0, 0, 1)).toBe(1)
    expect(reg.exec(0, 0, 0)).toBe(1)
    expect(reg.exec(0, 0, 1)).toBe(1)
    expect(reg.exec(0, 0, 0)).toBe(1)
    // store is on
    expect(reg.exec(0, 1, 1)).toBe(1)  // clock high => store 1
    expect(reg.exec(0, 1, 0)).toBe(1)  // 1 remembered; set next to 0
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
    expect(reg.exec(0, 1, 0)).toBe(0)  // 0 remembered; set next to 0
    // store is off
    expect(reg.exec(1, 0, 0)).toBe(0)
    // store is on
    expect(reg.exec(0, 1, 1)).toBe(0)  // clock high => store 0
})

test('8BIT REGISTER', () => {
    const reg = new REGISTER8()
    expect(reg.exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])  // clock low; set next to 11001010
    expect(reg.exec(0, 0, 0, 0, 0, 0, 0, 0, 1, 1)).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])  // clock high => store 11001010
    expect(reg.exec(0, 0, 0, 0, 0, 0, 0, 0, 1, 0)).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])  // 11001010 remembered; set next to 0000000
})

test('CLOCK', () => {
    const clock = new CLK()
    expect(clock.exec()).toBe(0)
    expect(clock.exec()).toBe(1)
    expect(clock.exec()).toBe(0)
    expect(clock.exec()).toBe(1)
    expect(clock.exec()).toBe(0)
})

test('8BIT AND', () => {
    expect(new AND8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0)).toStrictEqual([1, 1, 0, 0, 0, 0, 0, 0])
    expect(new AND8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0)).toStrictEqual([1, 0, 0, 0, 1, 0, 1, 0])
})

test('4BIT OR', () => {
    expect(new OR4().exec(1, 1, 0, 0, 1, 0, 1, 0)).toStrictEqual([1, 1, 1, 0])
    expect(new OR4().exec(1, 0, 1, 0, 1, 1, 0, 0)).toStrictEqual([1, 1, 1, 0])
})

test('8BIT OR', () => {
    expect(new OR8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0)).toStrictEqual([1, 1, 1, 1, 1, 0, 1, 0])
    expect(new OR8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0)).toStrictEqual([1, 1, 1, 0, 1, 0, 1, 0])
})

test('8BIT NOT', () => {
    expect(new NOT8().exec(1, 1, 0, 0, 1, 0, 1, 0)).toStrictEqual([0, 0, 1, 1, 0, 1, 0, 1])
})

test('8BIT NAND', () => {
    expect(new NAND8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0)).toStrictEqual([0, 0, 1, 1, 1, 1, 1, 1])
})

test('8BIT NOR', () => {
    expect(new NOR8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 1, 0, 1])
})

test('OR 4 INPUTS', () => {
    expect(new OR_4().exec(0, 0, 0, 0)).toBe(0)
    expect(new OR_4().exec(0, 0, 0, 1)).toBe(1)
    expect(new OR_4().exec(1, 0, 0, 0)).toBe(1)
    expect(new OR_4().exec(0, 0, 1, 0)).toBe(1)
    expect(new OR_4().exec(0, 1, 0, 0)).toBe(1)
    expect(new OR_4().exec(1, 1, 1, 1)).toBe(1)
})

test('OR 8 INPUTS', () => {
    expect(new OR_8().exec(0, 0, 0, 0, 0, 0, 0, 0)).toBe(0)
    expect(new OR_8().exec(0, 0, 0, 0, 0, 0, 0, 1)).toBe(1)
    expect(new OR_8().exec(0, 0, 0, 0, 0, 0, 1, 0)).toBe(1)
    expect(new OR_8().exec(0, 0, 0, 0, 0, 1, 0, 0)).toBe(1)
    expect(new OR_8().exec(0, 0, 0, 0, 1, 0, 0, 0)).toBe(1)
    expect(new OR_8().exec(0, 0, 0, 1, 0, 0, 0, 0)).toBe(1)
    expect(new OR_8().exec(0, 0, 1, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_8().exec(0, 1, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_8().exec(1, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_8().exec(1, 0, 0, 1, 1, 0, 0, 1)).toBe(1)
    expect(new OR_8().exec(1, 1, 1, 1, 1, 1, 1, 1)).toBe(1)
})

test('OR 16 INPUTS', () => {
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(0)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1)).toBe(1)
    expect(new OR_16().exec(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1)).toBe(1)
    expect(new OR_16().exec(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toBe(1)
})

test('AND 4 INPUTS', () => {
    expect(new AND_4().exec(0, 0, 0, 0)).toBe(0)
    expect(new AND_4().exec(0, 0, 0, 1)).toBe(0)
    expect(new AND_4().exec(1, 0, 0, 0)).toBe(0)
    expect(new AND_4().exec(0, 0, 1, 0)).toBe(0)
    expect(new AND_4().exec(0, 1, 0, 0)).toBe(0)
    expect(new AND_4().exec(0, 1, 1, 0)).toBe(0)
    expect(new AND_4().exec(1, 1, 1, 0)).toBe(0)
    expect(new AND_4().exec(0, 1, 1, 1)).toBe(0)
    expect(new AND_4().exec(1, 0, 1, 1)).toBe(0)
    expect(new AND_4().exec(1, 1, 0, 1)).toBe(0)
    expect(new AND_4().exec(1, 0, 0, 1)).toBe(0)
    expect(new AND_4().exec(1, 1, 1, 1)).toBe(1)
})

test('AND 5 INPUTS', () => {
    expect(new AND_5().exec(0, 0, 0, 0, 0)).toBe(0)
    expect(new AND_5().exec(0, 0, 0, 0, 1)).toBe(0)
    expect(new AND_5().exec(1, 0, 0, 0, 1)).toBe(0)
    expect(new AND_5().exec(0, 1, 0, 0, 0)).toBe(0)
    expect(new AND_5().exec(0, 0, 0, 1, 0)).toBe(0)
    expect(new AND_5().exec(0, 0, 1, 0, 0)).toBe(0)
    expect(new AND_5().exec(0, 0, 1, 1, 0)).toBe(0)
    expect(new AND_5().exec(0, 1, 1, 1, 0)).toBe(0)
    expect(new AND_5().exec(0, 0, 1, 1, 1)).toBe(0)
    expect(new AND_5().exec(0, 1, 0, 1, 1)).toBe(0)
    expect(new AND_5().exec(0, 1, 1, 0, 1)).toBe(0)
    expect(new AND_5().exec(0, 1, 0, 0, 1)).toBe(0)
    expect(new AND_5().exec(0, 1, 1, 1, 1)).toBe(0)
    expect(new AND_5().exec(1, 1, 1, 1, 1)).toBe(1)
})

test('MULTIPLEXER', () => {
    expect(new MUX().exec(1, 0, 1)).toBe(0)
    expect(new MUX().exec(1, 0, 0)).toBe(1)
    expect(new MUX().exec(0, 1, 0)).toBe(0)
    expect(new MUX().exec(0, 1, 1)).toBe(1)
    expect(new MUX().exec(0, 0, 0)).toBe(0)
    expect(new MUX().exec(0, 0, 1)).toBe(0)
    expect(new MUX().exec(1, 1, 0)).toBe(1)
    expect(new MUX().exec(1, 1, 1)).toBe(1)
})

test('8BIT XOR', () => {
    expect(new XOR8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0)).toStrictEqual([0, 0, 1, 1, 1, 0, 1, 0])
})

test('8BIT MULTIPLEXER', () => {
    expect(new MUX8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0)).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])
    expect(new MUX8().exec(1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0])
})

test('4BIT MULTIPLEXER', () => {
    expect(new MUX4().exec(0, 1, 0, 1, 1, 1, 1, 0, 0)).toStrictEqual([0, 1, 0, 1])
    expect(new MUX4().exec(0, 1, 0, 1, 1, 1, 1, 0, 1)).toStrictEqual([1, 1, 1, 0])
})

test('1BIT 4SELECT MULTIPLEXER', () => {
    expect(new MUX_4().exec(1, 0, 0, 0, 0, 0)).toBe(1)
    expect(new MUX_4().exec(1, 0, 0, 0, 0, 1)).toBe(0)
    expect(new MUX_4().exec(1, 0, 0, 0, 1, 0)).toBe(0)
    expect(new MUX_4().exec(1, 0, 0, 0, 1, 1)).toBe(0)
    expect(new MUX_4().exec(0, 1, 0, 0, 0, 0)).toBe(0)
    expect(new MUX_4().exec(0, 1, 0, 0, 0, 1)).toBe(1)
    expect(new MUX_4().exec(0, 1, 0, 0, 1, 0)).toBe(0)
    expect(new MUX_4().exec(0, 1, 0, 0, 1, 1)).toBe(0)
    expect(new MUX_4().exec(0, 0, 1, 0, 0, 0)).toBe(0)
    expect(new MUX_4().exec(0, 0, 1, 0, 0, 1)).toBe(0)
    expect(new MUX_4().exec(0, 0, 1, 0, 1, 0)).toBe(1)
    expect(new MUX_4().exec(0, 0, 1, 0, 1, 1)).toBe(0)
    expect(new MUX_4().exec(0, 0, 0, 1, 0, 0)).toBe(0)
    expect(new MUX_4().exec(0, 0, 0, 1, 0, 1)).toBe(0)
    expect(new MUX_4().exec(0, 0, 0, 1, 1, 0)).toBe(0)
    expect(new MUX_4().exec(0, 0, 0, 1, 1, 1)).toBe(1)
})

test('1BIT 16SELECT MULTIPLEXER', () => {
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0)).toBe(0)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0)).toBe(0)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0)).toBe(0)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 1)).toBe(0)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1)).toBe(0)
    expect(new MUX_16().exec(
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0)).toBe(0)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1, 0, 1, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1, 0, 1, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        1, 1, 0, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        1, 1, 0, 1)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        1, 1, 1, 0)).toBe(1)
    expect(new MUX_16().exec(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1)).toBe(1)
    expect(new MUX_16().exec(
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1)).toBe(0)
})

test('4BIT 4SELECT MULTIPLEXER', () => {
    expect(new MUX4_4().exec(
        0, 1, 0, 1,
        1, 0, 1, 0,
        1, 1, 0, 0,
        0, 0, 0, 1,
        0, 0)).toStrictEqual([0, 1, 0, 1])
    expect(new MUX4_4().exec(
        0, 1, 0, 1,
        1, 0, 1, 0,
        1, 1, 0, 0,
        0, 0, 0, 1,
        0, 1)).toStrictEqual([1, 0, 1, 0])
    expect(new MUX4_4().exec(
        0, 1, 0, 1,
        1, 0, 1, 0,
        1, 1, 0, 0,
        0, 0, 0, 1,
        1, 0)).toStrictEqual([1, 1, 0, 0])
    expect(new MUX4_4().exec(
        0, 1, 0, 1,
        1, 0, 1, 0,
        1, 1, 0, 0,
        0, 0, 0, 1,
        1, 1)).toStrictEqual([0, 0, 0, 1])
})

test('8BIT 4SELECT MULTIPLEXER', () => {
    expect(new MUX8_4().exec(
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0,
        0, 0)).toStrictEqual([0, 1, 0, 1, 0, 1, 0, 1])
    expect(new MUX8_4().exec(
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0,
        0, 1)).toStrictEqual([1, 0, 1, 0, 1, 0, 1, 0])
    expect(new MUX8_4().exec(
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0,
        1, 0)).toStrictEqual([1, 1, 0, 0, 1, 1, 0, 0])
    expect(new MUX8_4().exec(
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        1, 1, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0,
        1, 1)).toStrictEqual([0, 0, 0, 1, 1, 1, 0, 0])
})

test('8BIT 16SELECT MULTIPLEXER', () => {
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 1, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 1, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 1, 0, 0)).toStrictEqual([0, 0, 0, 1, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 1, 0, 1)).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 1, 1, 0)).toStrictEqual([0, 1, 0, 0, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0)).toStrictEqual([1, 1, 0, 0, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1)).toStrictEqual([1, 1, 1, 0, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 0)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1)).toStrictEqual([1, 1, 1, 1, 1, 0, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0)).toStrictEqual([1, 1, 1, 1, 1, 1, 0, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 1)).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 0])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0)).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1])
    expect(new MUX8_16().exec(
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 1])
})

test('EQUALS ZERO', () => {
    expect(new EZ().exec(1, 1, 0, 0, 1, 0, 1, 0)).toBe(0)
    expect(new EZ().exec(1, 0, 0, 0, 0, 0, 0, 0)).toBe(0)
    expect(new EZ().exec(0, 0, 0, 0, 0, 0, 0, 1)).toBe(0)
    expect(new EZ().exec(0, 0, 0, 1, 0, 0, 0, 0)).toBe(0)
    expect(new EZ().exec(1, 0, 1, 0, 1, 0, 1, 0)).toBe(0)
    expect(new EZ().exec(0, 1, 0, 1, 0, 1, 0, 1)).toBe(0)
    expect(new EZ().exec(0, 0, 0, 0, 0, 0, 0, 0)).toBe(1)
})

test('HALF ADDER', () => {
    expect(new HALFADDER().exec(0, 0)).toStrictEqual([0, 0])
    expect(new HALFADDER().exec(0, 1)).toStrictEqual([1, 0])
    expect(new HALFADDER().exec(1, 0)).toStrictEqual([1, 0])
    expect(new HALFADDER().exec(1, 1)).toStrictEqual([0, 1])
})

test('FULL ADDER', () => {
    expect(new FULLADDER().exec(0, 0, 0)).toStrictEqual([0, 0])
    expect(new FULLADDER().exec(0, 1, 0)).toStrictEqual([1, 0])
    expect(new FULLADDER().exec(1, 0, 0)).toStrictEqual([1, 0])
    expect(new FULLADDER().exec(1, 1, 0)).toStrictEqual([0, 1])
    expect(new FULLADDER().exec(0, 0, 1)).toStrictEqual([1, 0])
    expect(new FULLADDER().exec(0, 1, 1)).toStrictEqual([0, 1])
    expect(new FULLADDER().exec(1, 0, 1)).toStrictEqual([0, 1])
    expect(new FULLADDER().exec(1, 1, 1)).toStrictEqual([1, 1])
})

test('4BIT INCREMENTER', () => {
    expect(new INC4().exec(0, 0, 0, 0)).toStrictEqual([0, 0, 0, 1])
    expect(new INC4().exec(0, 0, 0, 1)).toStrictEqual([0, 0, 1, 0])
    expect(new INC4().exec(0, 0, 1, 1)).toStrictEqual([0, 1, 0, 0])
    expect(new INC4().exec(0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0])
    expect(new INC4().exec(0, 1, 1, 0)).toStrictEqual([0, 1, 1, 1])
    expect(new INC4().exec(0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0])
    expect(new INC4().exec(1, 0, 0, 0)).toStrictEqual([1, 0, 0, 1])
    expect(new INC4().exec(1, 0, 0, 1)).toStrictEqual([1, 0, 1, 0])
    expect(new INC4().exec(1, 0, 1, 0)).toStrictEqual([1, 0, 1, 1])
    expect(new INC4().exec(1, 0, 1, 1)).toStrictEqual([1, 1, 0, 0])
    expect(new INC4().exec(1, 1, 0, 0)).toStrictEqual([1, 1, 0, 1])
    expect(new INC4().exec(1, 1, 0, 1)).toStrictEqual([1, 1, 1, 0])
    expect(new INC4().exec(1, 1, 1, 0)).toStrictEqual([1, 1, 1, 1])
    expect(new INC4().exec(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0])
})

test('8BIT INCREMENTER', () => {
    expect(new INC().exec(0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1])
    expect(new INC().exec(0, 0, 0, 0, 0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 0])
    expect(new INC().exec(0, 0, 0, 0, 0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 1, 0, 0])
    expect(new INC().exec(0, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 1, 0, 0, 0])
    expect(new INC().exec(0, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 1, 1, 1])
    expect(new INC().exec(1, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 1, 0, 0, 0])
    expect(new INC().exec(1, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([1, 0, 0, 0, 0, 1, 1, 1])
    expect(new INC().exec(1, 1, 1, 1, 1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(new INC().exec(0, 1, 1, 1, 1, 1, 1, 1)).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 0])
})

test('8BIT DECREMENTER', () => {
    expect(new DEC().exec(0, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1])
    expect(new DEC().exec(0, 0, 0, 0, 0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(new DEC().exec(0, 0, 0, 0, 0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 0])
    expect(new DEC().exec(0, 0, 0, 0, 0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1])
    expect(new DEC().exec(0, 0, 0, 0, 0, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 1, 1, 0])
    expect(new DEC().exec(0, 0, 0, 0, 0, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 1, 0, 1])
    expect(new DEC().exec(1, 0, 0, 0, 0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 1, 1, 1, 1])
})

test('DUAL-EDGE-TRIGGERED D FLIP-FLOP', () => {
    const dedff = new DUAL_EDGE_DFF()    
    expect(dedff.exec(0, 0)).toBe(0)
    expect(dedff.exec(1, 0)).toBe(0)
    expect(dedff.exec(0, 1)).toBe(1)
    expect(dedff.exec(0, 0)).toBe(0)
    expect(dedff.exec(1, 0)).toBe(0) // no clock change (no edge) => values remains the same
    expect(dedff.exec(1, 1)).toBe(1)
    expect(dedff.exec(0, 0)).toBe(1)
})

test('4BIT DUAL-EDGE-TRIGGERED D FLIP-FLOP', () => {
    const dedff = new DUAL_EDGE_DFF4()    
    expect(dedff.exec(0, 0, 0, 0, 0)).toStrictEqual([0, 0, 0, 0])
    expect(dedff.exec(1, 0, 1, 1, 0)).toStrictEqual([0, 0, 0, 0])
    expect(dedff.exec(1, 0, 0, 1, 1)).toStrictEqual([1, 0, 1, 1])
    expect(dedff.exec(1, 1, 0, 0, 0)).toStrictEqual([1, 0, 0, 1])
    expect(dedff.exec(1, 0, 1, 0, 0)).toStrictEqual([1, 0, 0, 1]) // no clock change (no edge) => values remains the same
    expect(dedff.exec(1, 1, 1, 1, 1)).toStrictEqual([1, 0, 1, 0])
    expect(dedff.exec(0, 1, 0, 0, 0)).toStrictEqual([1, 1, 1, 1])
})
