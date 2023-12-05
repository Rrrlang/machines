const CPU = require('./cpu')

const Fetch = 0, Exec = 1

test('CPU: fetch/exec', () => {
    const cpu = new CPU()
    
    let clk = Fetch
    let res = cpu.exec(1, 0, 1, 1, 1, 0, 1, 1, clk) // instr JZDEC r[1, 1, 1] j[0, 1, 1]
    expect(res.slice(0, 4)).toStrictEqual([1, 1, 1, 1]) // data address; we can ignore data for fetch

    clk = Exec
    res = cpu.exec(0, 0, 0, 0, 0, 0, 0, 0, clk) // data (0)
    expect(res).toStrictEqual([
        0, 0, 1, 1,    // jump address because data is zero
        0, 0, 0, 0, 0, 0, 0, 0  // stays zero
    ])

    clk = Fetch
    res = cpu.exec(0, 1, 1, 1, 0, 0, 0, 0, clk) // instr INC r[1, 1, 0]
    expect(res.slice(0, 4)).toStrictEqual([1, 1, 1, 0]) // data address; we can ignore data for fetch

    clk = Exec
    res = cpu.exec(0, 0, 0, 0, 1, 1, 0, 0, clk) // data (12)
    expect(res).toStrictEqual([
        0, 1, 0, 0,    // next address (pc+1) 0011 + 1 = 0100
        0, 0, 0, 0, 1, 1, 0, 1  // 12 + 1 = 13
    ])

    clk = Fetch
    res = cpu.exec(1, 0, 1, 1, 0, 0, 1, 0, clk) // instr JZDEC r[1, 1, 0] j[0, 1, 0]
    expect(res.slice(0, 4)).toStrictEqual([1, 1, 1, 0]) // data address; we can ignore data for fetch

    clk = Exec
    res = cpu.exec(0, 0, 0, 0, 1, 1, 0, 1, clk) // data (13)
    expect(res).toStrictEqual([
        0, 1, 0, 1,    // next address (pc+1) 0100 + 1 = 0101 because not zero
        0, 0, 0, 0, 1, 1, 0, 0  // decrement 13 - 1 = 12
    ])

    clk = Fetch
    res = cpu.exec(0, 0, 0, 0, 0, 0, 0, 0, clk) // instr HALT
    expect(res.slice(0, 4)).toStrictEqual([1, 0, 0, 0]) // data address; we can ignore data for fetch

    clk = Exec
    res = cpu.exec(1, 0, 1, 0, 1, 1, 0, 0, clk) // data is irrelevant for HALT
    expect(res).toStrictEqual([
        0, 1, 0, 1,    // address remains the same
        1, 0, 1, 0, 1, 1, 0, 0  // data remains the same
    ])
})
