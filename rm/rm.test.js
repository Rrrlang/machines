const RM = require('./rm')

test('simple program', () => {

    const m = new RM(`
        0 INC P 1
        1 JZDEC P 2 1
        2 HALT
        `)    

    expect(m.compute()).toBe('0')
})

test('simple program: numeric register only', () => {

    const input = []
    input[20] = 123  // data
    input[10] = 20   // P

    const m = new RM(`
        0 INC 10 1
        1 JZDEC 10 2 1
        2 HALT
        `, 
        input)    

    expect(m.compute()).toBe('20 0')
})

test('simple program with two registers', () => {

    const m = new RM(`
        0 INC P 1
        1 INC p 2
        2 INC P 3
        3 JZDEC P 4 3
        4 HALT
        `)    

    expect(m.compute()).toBe('1 0')
})

test('copy program', () => {

    const input = [42, 0]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1

    const m = new RM(`
        0 JZDEC k 1 0
        1 JZDEC a 2 1
        2 JZDEC j 3 5
        3 JZDEC a 7 4
        4 INC j 3
        5 INC k 6
        6 INC a 2
        7 HALT
        `,
        input)

    expect(m.compute()).toBe('42 42')
})

test('copy program #2', () => {

    const input = [42, 123]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1

    const m = new RM(`
        0 JZDEC k 1 0
        1 JZDEC a 2 1
        2 JZDEC j 3 5
        3 JZDEC a 7 4
        4 INC j 3
        5 INC k 6
        6 INC a 2
        7 HALT
        `,
        input)

    expect(m.compute()).toBe('42 42')
})

test('equals program true', () => {

    const input = [42, 42, 0, 0]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1
    input['n'] = 2
    input['m'] = 3

    const m = new RM(`
         0 JZDEC a 1 0
         1 JZDEC j 2 4
         2 JZDEC k 7 3
         3 INC k 10
         4 JZDEC k 6 5
         5 INC a 1
         6 INC j 10
         7 JZDEC a 13 8
         8 INC j 9
         9 INC k 7
        10 JZDEC a 14 11
        11 INC j 12
        12 INC k 10
        13 INC n 15
        14 INC m 15
        15 HALT
        `,
        input)

    expect(m.compute()).toBe('42 42 1 0')
})

test('equals program true #2', () => {

    const input = [0, 0, 0, 0]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1
    input['n'] = 2
    input['m'] = 3

    const m = new RM(`
         0 JZDEC a 1 0
         1 JZDEC j 2 4
         2 JZDEC k 7 3
         3 INC k 10
         4 JZDEC k 6 5
         5 INC a 1
         6 INC j 10
         7 JZDEC a 13 8
         8 INC j 9
         9 INC k 7
        10 JZDEC a 14 11
        11 INC j 12
        12 INC k 10
        13 INC n 15
        14 INC m 15
        15 HALT
        `,
        input)

    expect(m.compute()).toBe('0 0 1 0')
})

test('equals program false', () => {

    const input = [42, 123, 0, 0]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1
    input['n'] = 2
    input['m'] = 3

    const m = new RM(`
         0 JZDEC a 1 0
         1 JZDEC j 2 4
         2 JZDEC k 7 3
         3 INC k 10
         4 JZDEC k 6 5
         5 INC a 1
         6 INC j 10
         7 JZDEC a 13 8
         8 INC j 9
         9 INC k 7
        10 JZDEC a 14 11
        11 INC j 12
        12 INC k 10
        13 INC n 15
        14 INC m 15
        15 HALT
        `,
        input)

    expect(m.compute()).toBe('42 123 0 1')
})

test('equals program false #2', () => {

    const input = [1, 0, 0, 0]
    // pointers to data registers:
    input['j'] = 0
    input['k'] = 1
    input['n'] = 2
    input['m'] = 3

    const m = new RM(`
         0 JZDEC a 1 0
         1 JZDEC j 2 4
         2 JZDEC k 7 3
         3 INC k 10
         4 JZDEC k 6 5
         5 INC a 1
         6 INC j 10
         7 JZDEC a 13 8
         8 INC j 9
         9 INC k 7
        10 JZDEC a 14 11
        11 INC j 12
        12 INC k 10
        13 INC n 15
        14 INC m 15
        15 HALT
        `,
        input)

    expect(m.compute()).toBe('1 0 0 1')
})