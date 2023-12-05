const UTM = require('./utm')

test('flip r->R, R->r', () => {

    const tm = new UTM(
        '(0,R,r,>,1)(1,r,R,>,0)', 
        'RrRrRr',
        ['R', 'r'] /* no epsilon here */)

    expect(tm.compute()).toBe('rRrRrR')
})

test('generate RrRrRr...', () => {

    const tm = new UTM(
        '(0,ε,R,>,1)(1,ε,r,>,0)')
    tm.maxSteps = 1000

    expect(tm.compute()).toStartWith('RrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRr')
})

test('generate RrrRrrRrr...', () => {

    const tm = new UTM(`
       (q0,ε,R,>,q1)
       (q1,ε,r,>,q2)
       (q2,ε,r,>,q0)`)
    tm.maxSteps = 1000

    expect(tm.compute()).toStartWith('RrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrr')
})

test('add two unary numbers', () => {

    const tm = new UTM(`
        (q0,r,r,>,q0)
        (q0,R,r,>,q1)
        (q1,r,r,>,q1)
        (q1,ε,ε,<,q2)
        (q2,r,ε,>,q3)`,
        'rrRrrr' /* 2 + 3 */)

    expect(tm.compute()).toStartWith('rrrrr' /* 5 */)
})

test('divide by two', () => {

    const dn = `
        (q0,r,r,>,q1)
        (q1,r,r,<,q2)
        (q2,r,R,>,q3)
        (q3,r,r,>,q3)
        (q3,R,R,<,q4)
        (q4,r,r,<,q5)
        (q5,r,r,>,q6)
        (q5,R,R,>,q0)
        (q6,r,R,<,q7)
        (q7,r,r,<,q7)
        (q7,R,R,>,q0)
        (q1,R,R,<,q8)
        (q8,r,R,<,q9)
        (q9,R,r,<,q9)`

    expect(new UTM(dn, 'rR').compute()).toBe('RR')
    expect(new UTM(dn, 'rrR').compute()).toBe('rRR')
    expect(new UTM(dn, 'rrrR').compute()).toBe('rRRR')
    expect(new UTM(dn, 'rrrrrR').compute()).toBe('rrRRRR')
    expect(new UTM(dn, 'rrrrrrrrR').compute()).toBe('rrrrRRRRR')
})

test('copy program', () => {

    const dn = `
        (q0,r,R,>,q1)
        (q1,r,r,>,q1)
        (q1,ε,ε,>,q2)
        (q2,r,r,>,q2)
        (q2,ε,r,<,q3)
        (q3,r,r,<,q3)
        (q3,ε,ε,<,q4)
        (q4,r,r,<,q4)
        (q4,R,r,>,q0)
        (q0,ε,r,>,q5)
        (q5,r,r,>,q5)
        (q5,ε,ε,<,q6)
        (q6,r,ε,<,q7)
        `

    expect(new UTM(dn, '').compute()).toBe('')
    expect(new UTM(dn, 'r').compute()).toBe('rr')
    expect(new UTM(dn, 'rr').compute()).toBe('rrrr')
    expect(new UTM(dn, 'rrr').compute()).toBe('rrrrrr')
    expect(new UTM(dn, 'rrrr').compute()).toBe('rrrrrrrr')
})

test('palindromes', () => {

    const dn = `
        (q0,r,ε,>,q1)
        (q1,R,R,>,q1)
        (q1,r,r,>,q1)
        (q1,ε,ε,<,q2)
        (q2,ε,ε,<,q0)
        (q2,r,ε,<,q3)
        (q3,R,R,<,q3)
        (q3,r,r,<,q3)
        (q3,ε,ε,>,q0)
        (q0,R,ε,>,q4)
        (q4,R,R,>,q4)
        (q4,r,r,>,q4)
        (q4,ε,ε,<,q5)
        (q5,ε,ε,<,q0)
        (q5,R,ε,<,q3)
        (q0,ε,r,>,q7)
        (q2,R,ε,<,q6)
        (q5,r,ε,<,q6)
        (q6,R,ε,<,q6)
        (q6,r,ε,<,q6)
        (q6,ε,R,>,q7)
        `

    expect(new UTM(dn, '').compute()).toBe('r')
    expect(new UTM(dn, 'r').compute()).toBe('r')
    expect(new UTM(dn, 'rr').compute()).toBe('r')
    expect(new UTM(dn, 'rrr').compute()).toBe('r')
    expect(new UTM(dn, 'rrrr').compute()).toBe('r')
    expect(new UTM(dn, 'R').compute()).toBe('r')
    expect(new UTM(dn, 'RR').compute()).toBe('r')
    expect(new UTM(dn, 'RRR').compute()).toBe('r')
    expect(new UTM(dn, 'RRRR').compute()).toBe('r')
    expect(new UTM(dn, 'RrR').compute()).toBe('r')
    expect(new UTM(dn, 'rRr').compute()).toBe('r')
    expect(new UTM(dn, 'RrRrR').compute()).toBe('r')
    expect(new UTM(dn, 'RrRRrR').compute()).toBe('r')
    expect(new UTM(dn, 'RrRrRrR').compute()).toBe('r')
    expect(new UTM(dn, 'RrRrrRrR').compute()).toBe('r')
    expect(new UTM(dn, 'rRrRrrRrRr').compute()).toBe('r')
    expect(new UTM(dn, 'rrRrRrrRrRrr').compute()).toBe('r')
    expect(new UTM(dn, 'rrRRrRrrRrRRrr').compute()).toBe('r')
    expect(new UTM(dn, 'rrRRrRrRRRrRrRRrr').compute()).toBe('r')
    expect(new UTM(dn, 'rrrRRrrrRrRRRrRrrrRRrrr').compute()).toBe('r')
    expect(new UTM(dn, 'rR').compute()).toBe('R')
    expect(new UTM(dn, 'Rr').compute()).toBe('R')
    expect(new UTM(dn, 'RrRr').compute()).toBe('R')
    expect(new UTM(dn, 'rRrR').compute()).toBe('R')
    expect(new UTM(dn, 'rrRR').compute()).toBe('R')
    expect(new UTM(dn, 'RRrr').compute()).toBe('R')
    expect(new UTM(dn, 'rRrRRr').compute()).toBe('R')
    expect(new UTM(dn, 'rrRrRr').compute()).toBe('R')
    expect(new UTM(dn, 'rrRrRRr').compute()).toBe('R')
    expect(new UTM(dn, 'rrRrRRr').compute()).toBe('R')
    expect(new UTM(dn, 'rrRRrRRr').compute()).toBe('R')
    expect(new UTM(dn, 'rrRRrRRrrr').compute()).toBe('R')
})

test('hello world', () => {

    const dn = `
        (q0,ε,H,>,q1)
        (q1,ε,e,>,q2)
        (q2,ε,l,>,q3)
        (q3,ε,l,>,q4)
        (q4,ε,o,>,q5)
        (q5,ε,ε,>,q6)
        (q6,ε,w,>,q7)
        (q7,ε,o,>,q8)
        (q8,ε,r,>,q9)
        (q9,ε,l,>,q10)
        (q10,ε,d,>,q11)
        `

    expect(new UTM(dn, '', ['ε','H','e','l','o','w','r','d']).compute())
        .toBe('Hello world')
})