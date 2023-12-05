const MEMORY = require('./memory')

test('MEMORY', () => {
    const mem = new MEMORY()

    // store off
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 1, 1, 1, 1, 1, 1, 0,
        0
    )).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])

    // store on
    expect(mem.exec(
        0, 0, 0, 0, 
        1, 1, 0, 0, 1, 0, 1, 0,
        1
    )).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])

    // should be stored by switching strore off again
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])
    
    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])

    // store on
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 1, 1, 0, 0, 0, 0, 0,
        1
    )).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])

    // store on
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 1, 1, 1, 0, 0, 0, 0,
        1
    )).toStrictEqual([1, 1, 0, 0, 1, 0, 1, 0])

    // should be stored by switching strore off again
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 1,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 1, 0,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 1, 0, 0,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // store to a different address
    expect(mem.exec(
        0, 0, 1, 0, 
        1, 0, 0, 0, 0, 1, 0, 0,
        1
    )).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])

    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // should be also stored
    expect(mem.exec(
        0, 0, 1, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0])

    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // store to yet another address
    expect(mem.exec(
        1, 1, 1, 1, 
        0, 0, 0, 1, 1, 1, 0, 1,
        1
    )).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0])

    // should be stored
    expect(mem.exec(
        1, 1, 1, 1, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([0, 0, 0, 1, 1, 1, 0, 1])

    // should be still stored
    expect(mem.exec(
        0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([0, 1, 1, 1, 0, 0, 0, 0])

    // should be still stored
    expect(mem.exec(
        0, 0, 1, 0, 
        0, 0, 0, 0, 0, 0, 0, 0,
        0
    )).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0])
})