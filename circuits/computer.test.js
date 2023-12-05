const COMPUTER = require('./computer')

test('COMPUTER: store program', () => {
    const comp = new COMPUTER(`
        01 111 000  // i0: INC d7
        01 110 000  // i1: INC d6
        10 111 011  // i2: JZDEC d7 i3
        00 000 000  // i3: HALT
    `)
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 1, 0, 0, 0])
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([1, 0, 1, 1, 1, 0, 1, 1])
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])
})

test('COMPUTER: run simple program #1', () => {
    const comp = new COMPUTER(`
        01 111 000  // i0: INC d7
        00 000 000  // i1: HALT
    `)
    comp.compute()
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 1, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1]) // data 7
})

test('COMPUTER: run simple program #2', () => {
    const comp = new COMPUTER(`
        01 110 000  // i0: INC d6
        00 000 000  // i1: HALT
    `)
    comp.compute()
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 7
})

test('COMPUTER: run simple program #3', () => {
    const comp = new COMPUTER(`
        01 110 000  // i0: INC d6
        01 111 000  // i1: INC d7
        00 000 000  // i2: HALT
    `)
    comp.compute()
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 1, 1, 1, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1]) // data 7
})

test('COMPUTER: run simple program #4', () => {
    const comp = new COMPUTER(`
        01 110 000  // i0: INC d6
        01 110 000  // i1: INC d6
        00 000 000  // i2: HALT
    `)
    comp.compute()
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 0]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 7
})

test('COMPUTER: run simple program #5', () => {
    const comp = new COMPUTER(`
        01 111 000  // i0: INC d7
        01 110 000  // i1: INC d6
        10 111 011  // i2: JZDEC d7 i3
        00 000 000  // i3: HALT
    `)
    comp.compute()
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 1, 1, 1, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([1, 0, 1, 1, 1, 0, 1, 1]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 1]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 7
})

test('COMPUTER: run simple program #6', () => {
    const comp = new COMPUTER(`
        01 000 000  // i0: INC d0
        01 000 000  // i1: INC d0
        01 000 000  // i2: INC d0
        00 000 000  // i3: HALT
    `)
    comp.compute()

    console.log(comp.printData())
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([0, 1, 0, 0, 0, 0, 0, 0]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 0, 0, 0, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 1, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 1]) // data 0
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 7
})

test('COMPUTER: run clear program', () => {
    const comp = new COMPUTER(`
        10 000 001  // i0: JZDEC d0 i2
        10 111 000  // i1: JZDEC d7 i0   (d7 is zero, so goto i0)
        00 000 000  // i2: HALT
    `)
    
    // setup data to copy
    comp.mem(1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1)    // data 0 <== 11110000 (240)

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([1, 1, 1, 1, 0, 0, 0, 0]) // data 0 is set to 240

    comp.compute(960) // each instr runs at least two times for fetch+exec; i0 runs 239 x 2 times + i1 runs 240 x 2 times + i2 runs 1 x 2 times 

    console.log(comp.printData())
    
    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 1]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([1, 0, 1, 1, 1, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3
    expect(comp.mem(0, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 4

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0 is clear
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2
    expect(comp.mem(1, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 3
    expect(comp.mem(1, 1, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 4
    expect(comp.mem(1, 1, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 5
    expect(comp.mem(1, 1, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 6
    expect(comp.mem(1, 1, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 7
})

test('COMPUTER: run copy/move program', () => {
    const comp = new COMPUTER(`
        01 000 000  // i0: INC d0
        01 000 000  // i1: INC d0
        01 000 000  // i2: INC d0
        10 000 110  // i3: JZDEC d0 i6
        01 001 000  // i4: INC d1
        10 111 011  // i5: JZDEC d7 i3   (d7 is zero, so goto i3)
        00 000 000  // i6: HALT
    `)
    comp.compute(1000)

    console.log(comp.printData())
    
    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0 is cleared 
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 1]) // data 1 contains copied 3
})

test('COMPUTER: run copy/move program #2', () => {
    const comp = new COMPUTER(`
        10 000 011  // i0: JZDEC d0 i3
        01 001 000  // i1: INC d1
        10 111 000  // i2: JZDEC d7 i0   (d7 is zero, so goto i0)
        00 000 000  // i3: HALT
    `)

    // setup some data to copy to "data 0"
    comp.mem(1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1)    // data 0 <== 00110101 (53)

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 1, 1, 0, 1, 0, 1]) // data 0 is set to 53
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 1 is zero

    comp.compute(1000)

    console.log(comp.printData())

    expect(comp.mem(0, 0, 0, 0)).toStrictEqual([1, 0, 0, 0, 0, 0, 1, 1]) // instr 0
    expect(comp.mem(0, 0, 0, 1)).toStrictEqual([0, 1, 0, 0, 1, 0, 0, 0]) // instr 1
    expect(comp.mem(0, 0, 1, 0)).toStrictEqual([1, 0, 1, 1, 1, 0, 0, 0]) // instr 2
    expect(comp.mem(0, 0, 1, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // instr 3

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 0 is cleared 
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 1, 1, 0, 1, 0, 1]) // data 1 contains copied 53
})

test('COMPUTER: run C=A+B', () => {
    const comp = new COMPUTER(`
        10 000 011  // i0: JZDEC d0 i3
        01 010 000  // i1: INC d2
        10 111 000  // i2: GOTO i0
        10 001 110  // i3: JZDEC d0 i6
        01 010 000  // i4: INC d2
        10 111 011  // i5: GOTO i3
        00 000 000  // i6: HALT 
    `)

    // setup some data to copy to d0 and d1 
    comp.mem(1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1)    // data 0 <== 01011011 (91)
    comp.mem(1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1)    // data 1 <== 00001101 (13)

    expect(comp.mem(1, 0, 0, 0)).toStrictEqual([0, 1, 0, 1, 1, 0, 1, 1]) // data 0 is set to 91 (A)
    expect(comp.mem(1, 0, 0, 1)).toStrictEqual([0, 0, 0, 0, 1, 1, 0, 1]) // data 1 is set to 13 (B)
    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]) // data 2 is zero      (C)

    comp.compute(1000)

    console.log(comp.printData())

    expect(comp.mem(1, 0, 1, 0)).toStrictEqual([0, 1, 1, 0, 1, 0, 0, 0]) // C = 104
})

