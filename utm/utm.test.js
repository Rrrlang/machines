const UTM = require('./utm')

const initTapes = `
(0,r,r,>,0)
(0,R,R,>,1)
(1,r,r,>,0)
(1,R,#,<,2)
(2,R,#,>,3)
(3,#,#,>,4)
(4,r,r,>,4)
(4,R,R,>,4)
(4,ɛ,#,>,5)`

test('init: tape separators ###', () => {

    const u = new UTM(initTapes, 
        'rRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrRr##rRrR#')
    expect(u.control.state).toBe('q5')
    expect(u.head.position()).toBe(16)
})

const initHead = `
(5,ɛ,#,<,6)
(6,#,ɛ,<,7)
(7,ɛ,ɛ,<,7)
(7,R,ɛ,>,8)
(8,ɛ,R,<,7)
(7,r,ɛ,>,9)
(9,ɛ,r,<,7)
(7,#,#,>,10)
(10,ɛ,*,>,11)`

test('init: shift right the working tape to make a head mark', () => {

    const u = new UTM(initTapes + initHead, 
        'rRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrRr##*rRrR#')
    expect(u.control.state).toBe('q11')
    expect(u.head.position()).toBe(12)
})

const initRegister = `
(11,R,R,>,11)
(11,r,r,>,11)
(11,#,ɛ,>,12)
(12,ɛ,#,<,13)
(13,ɛ,ɛ,<,13)
(13,R,ɛ,>,14)
(14,ɛ,R,<,13)
(13,r,ɛ,>,15)
(15,ɛ,r,<,13)
(13,*,ɛ,>,16)
(16,ɛ,*,<,13)
(13,#,ɛ,>,17)
(17,ɛ,#,<,18)
(18,ɛ,r,<,19)
(19,#,#,<,20)
`

const init = initTapes + initHead + initRegister

test('init: register', () => {

    const u = new UTM(initTapes + initHead + initRegister, 
        'rRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q20')
    expect(u.head.position()).toBe(8)
})

test('init', () => {

    const u = new UTM(init, 
        'rRrRrRrRrRrrRrrRrrRrrRrrRRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrRrRrrRrrRrrRrrRrr#r#*RrRrR#')
    expect(u.control.state).toBe('q20')
    expect(u.head.position()).toBe(23)
})

test('init: empty input', () => {

    const u = new UTM(init, 
        'rRrRrRrRrRR')

    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrRr#r#*#')
    expect(u.control.state).toBe('q20')
    expect(u.head.position()).toBe(8)
})

const findNextState = `
(20,R,R,<,20)
(20,r,r,<,20)
(20,ɛ,ɛ,>,21)
(21,r,+,>,22)
(22,R,R,>,22)
(22,r,r,>,22)
(22,#,#,>,23)
(23,+,+,>,23)
(23,r,+,<,25)
(23,#,#,<,24)
(24,+,r,<,24)
(24,+,r,<,24)
(24,#,#,<,29)
(29,R,R,<,29)
(29,r,r,<,29)
(29,+,+,>,30)
(30,r,r,>,30)
(30,R,R,>,31)
(31,r,r,>,31)
(31,R,R,>,32)
(32,r,r,>,32)
(32,R,R,>,33)
(33,r,r,>,33)
(33,R,R,>,34)
(34,r,r,>,34)
(34,R,R,>,21)
(34,#,#,>,123)
(25,+,+,<,25)
(25,#,#,<,26)
(26,R,R,<,26)
(26,r,r,<,26)
(26,+,+,>,21)
(21,R,R,>,27)
(27,R,R,>,27)
(27,r,r,>,27)
(27,#,#,>,28)
(28,+,+,>,28)
(28,r,r,<,24)
(28,#,#,<,35)
`

test('find next: state', () => {

    const u = new UTM(init + findNextState, 
        'rRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q35')
    expect(u.head.position()).toBe(10)
})

test('find next: state / not found', () => {

    const u = new UTM(init + findNextState, 
        'rrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(11)
})

test('find next: state / second found', () => {

    const u = new UTM(init + findNextState, 
        'rrRrRrRrRrRrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q35')
    expect(u.head.position()).toBe(21)
})

test('find next: state / third found', () => {

    const u = new UTM(init + findNextState, 
        'rrrRrRrRrRrRrrRrRrRrRrRrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++rRrRrRrRrR++RrRrRrRrR+RrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q35')
    expect(u.head.position()).toBe(33)
})

test('find next: state / second found from three', () => {

    const u = new UTM(init + findNextState, 
        'rrrRrRrRrRrRrRrRrRrRrRrrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++rRrRrRrRrR+RrRrRrRrRrrRrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q35')
    expect(u.head.position()).toBe(33)
})

test('find next: state / second not found', () => {

    const u = new UTM(init + findNextState, 
        'rrRrRrRrRrRrrrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR++rRrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(23)
})

const checkReadSymbol = `
(35,+,+,<,35)
(35,#,#,<,36)
(36,R,R,<,36)
(36,r,r,<,36)
(36,+,+,>,37)
(37,R,R,>,38)
(38,r,r,>,39)
(39,R,R,>,40)
(40,R,R,>,40)
(40,r,r,>,40)
(40,#,#,>,41)
(41,+,+,>,41)
(41,#,#,>,42)
(42,R,R,>,42)
(42,r,r,>,42)
(42,*,*,>,43)
(43,r,r,<,49)
(43,#,#,<,49)
(43,R,R,<,51)
(39,r,r,>,44)
(44,R,R,>,45)
(45,R,R,>,45)
(45,r,r,>,45)
(45,#,#,>,46)
(46,+,+,>,46)
(46,#,#,>,47)
(47,R,R,>,47)
(47,r,r,>,47)
(47,*,*,>,48)
(48,r,r,<,51)
(48,R,R,<,49)
(48,#,#,<,49)
(49,*,*,<,50)
(50,R,R,<,50)
(50,r,r,<,50)
(50,#,#,<,24)
`

test('find next: read symbol upper R', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rRrRrRrRrRRRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrRr#+#*RrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(12)
})

test('find next: read symbol lower r', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rRrrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(13)
})

test('find next: read symbol upper R not found', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(10)
})

test('find next: read symbol lower r not found', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rRrrRrRrRrRRRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrrRrRrRr#r#*RrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(11)
})

test('find next: second rule, read symbol upper R', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rrRrRrRrRrRrRrRrRrRrRRRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrRrRrRr#+#*RrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(23)
})

test('find next: second rule, read symbol lower r', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rrRrRrRrRrRrRrrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(24)
})

test('find next: two rules, read symbol lower r not found', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rrRrRrRrRrRrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(21)
})

test('find next: three rules, read symbol lower r', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rrRrrRrRrRrRrrrRrrRrRrRrRrRrrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrrRrRrRrR++rRrrRrRrRrR+RrrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(38)
})

test('find next: three rules, read symbol upper R not found', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rrRrrRrRrRrRrrrRrrRrRrRrRrRrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('++RrrRrRrRrR++rRrrRrRrRrR+RrRrRrRr#r#*rRrR#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(35)
})

test('find next: three matching rules (by state), read symbol lower r matches only once', () => {

    const u = new UTM(init + findNextState + checkReadSymbol, 
        'rRrRrrRrRr R rrRrrRrrRrRr R rRrrRrRrRr RR rRrR'.replaceAll(' ',''))

    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrRrR++RrrRrrRrRrR+RrrRrRrRr#+#*rRrR#')
    expect(u.control.state).toBe('q51')
    expect(u.head.position()).toBe(37)
})

const executeWriteSymbol = `
(51,*,*,<,52)
(52,R,R,<,52)
(52,r,r,<,52)
(52,#,#,<,53)
(53,+,+,<,53)
(53,#,#,<,54)
(54,R,R,<,54)
(54,r,r,<,54)
(54,+,+,>,55)
(55,r,r,>,55)
(55,R,R,>,56)
(56,r,r,>,56)
(56,R,R,>,57)
(57,r,r,>,58)
(58,R,R,>,59)
(59,R,R,>,59)
(59,r,r,>,59)
(59,#,#,>,60)
(60,+,+,>,60)
(60,#,#,>,61)
(61,R,R,>,61)
(61,r,r,>,61)
(61,*,*,>,62)
(62,R,R,<,72)
(62,r,R,<,72)
(62,#,R,>,63)
(63,ɛ,#,<,70)
(70,R,R,<,72)
(58,r,r,>,64)
(64,R,R,>,65)
(65,R,R,>,65)
(65,r,r,>,65)
(65,#,#,>,66)
(66,+,+,>,66)
(66,#,#,>,67)
(67,R,R,>,67)
(67,r,r,>,67)
(67,*,*,>,68)
(68,R,r,<,72)
(68,r,r,<,72)
(68,#,r,>,69)
(69,ɛ,#,>,71)
(71,r,r,>,72)
`

const find = findNextState + checkReadSymbol

test('execute: write symbol lower r', () => {

    const u = new UTM(init + find + executeWriteSymbol, 
        'rRrRrrRrRrRRRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrRr#+#*rrR#')
    expect(u.control.state).toBe('q72')
    expect(u.head.position()).toBe(13)
})

test('execute: write symbol upper R', () => {

    const u = new UTM(init + find + executeWriteSymbol, 
        'rRrRrRrRrRRRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrRr#+#*RrR#')
    expect(u.control.state).toBe('q72')
    expect(u.head.position()).toBe(12)
})

test('execute: write symbol upper R (read R)', () => {

    const u = new UTM(init + find + executeWriteSymbol, 
        'rRrrRrRrRrRRrRrR')

    u.compute()

    expect(u.tape.output()).toBe('+RrrRrRrRr#+#*RRrR#')
    expect(u.control.state).toBe('q72')
    expect(u.head.position()).toBe(13)
})

test('execute: write symbol lower r (two rules)', () => {

    const u = new UTM(init + find + executeWriteSymbol, 
        'rRrrRrRrRr R rRrRrrRrRr RR RrR'.replaceAll(' ',''))

    u.compute()

    expect(u.tape.output()).toBe('+RrrRrRrRrR+RrRrrRrRr#+#*rrR#')
    expect(u.control.state).toBe('q72')
    expect(u.head.position()).toBe(24)
})

test('execute: three matching rules (by state), read symbol r matches only once', () => {

    const u = new UTM(init + find + executeWriteSymbol,  
        'rRrRrRrrRr R rrRrrRrrRrRr R rRrrRrRrRr RR rRrR'.replaceAll(' ',''))
    //   0,R,r,>,0    1,r,r,<,0      0,r,R,<,0
    //                               ^^^^^^^^^ only mathing, so R must be written
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRrR++RrrRrrRrRrR+RrrRrRrRr#+#*RRrR#')
    expect(u.control.state).toBe('q72')
    expect(u.head.position()).toBe(37)
})

test('execute: an empty working tape', () => {

    const u = new UTM(init + find + executeWriteSymbol, 
        'rRrRrrRrRrRR') // cannot find the read symbol (the tape is empty)

    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrRr#r#*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(11)
})

const executeMove = `
(72,*,*,<,72)
(72,R,R,<,72)
(72,r,r,<,72)
(72,#,#,<,73)
(73,+,+,<,73)
(73,#,#,<,74)
(74,R,R,<,74)
(74,r,r,<,74)
(74,+,+,>,75)
(75,r,r,>,75)
(75,R,R,>,76)
(76,r,r,>,76)
(76,R,R,>,77)
(77,r,r,>,77)
(77,R,R,>,78)
(78,r,r,>,79)
(79,r,r,>,80)
(80,R,R,>,80)
(80,r,r,>,80)
(80,#,#,>,81)
(81,+,+,>,81)
(81,#,#,>,82)
(82,R,R,>,82)
(82,r,r,>,82)
(82,*,*,>,83)
(83,R,*,<,84)
(83,r,*,<,85)
(84,*,R,>,92)
(85,*,r,>,92)
(79,R,R,>,86)
(86,R,R,>,86)
(86,r,r,>,86)
(86,#,#,>,87)
(87,+,+,>,87)
(87,#,#,>,88)
(88,R,R,>,88)
(88,r,r,>,88)
(88,*,*,<,89)
(89,r,*,>,90)
(89,R,*,>,91)
(90,*,r,<,92)
(91,*,R,<,92)
`

test('execute: move right, upper R', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rRrRrRrrRr RR Rr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr#+#R*r#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(14)
})

test('execute: move right, upper R, single input', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rRrRrRrrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr#+#R*#')  // this is allowed, but there is no way out
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(14)
})

test('execute: move right, lower r', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rRrrRrrRrrRr RR rRr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr#+#r*Rr#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(16)
})

test('execute: move right, lower r, single input', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rRrrRrrRrrRr RR r'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr#+#r*#')  // this is allowed, but there is no way out
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(16)
})

test('execute: move right, upper R, three rules', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rrRrRrRrRr R rRrRrRrrRr R rrRrRrRrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrRrRrrRrRrrRrRrRrRr#+#R*#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(36)
})

test('execute: move right, lower r, three rules', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rrRrRrRrRr R rRrRrRrRr R rRrrRrrRrrRr RR r'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrRrRrRrR+RrrRrrRrrRr#+#r*#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(37)
})

test('execute: move right, upper R to lower r, three rules', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rrRrRrRrRr R rRrrRrrRrRr R rRrRrrRrrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrrRrrRrRrR+RrRrrRrrRr#+#r*#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(38)
})

test('execute: move right, upper R to lower r, three rules, longer input', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rrRrRrRrRr R rRrrRrrRrRr R rRrRrrRrrRr RR RRr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('++RrRrRrRrR+RrrRrrRrRrR+RrRrrRrrRr#+#r*Rr#')
    expect(u.control.state).toBe('q92')
    expect(u.head.position()).toBe(38)
})

test('execute: move over left edge (must not)', () => {

    const u = new UTM(init + find + executeWriteSymbol + executeMove,  
        'rRrRrRrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrRr#+#*R#')
    expect(u.control.state).toBe('q89')
    expect(u.head.position()).toBe(11)
})

const cleanUp = `
(92,R,R,<,92)
(92,r,r,<,92)
(92,*,*,<,92)
(92,#,#,<,93)
(93,+,#,>,94)
(94,#,ɛ,>,95)
(95,*,ɛ,<,96)
(96,ɛ,*,>,97)
(97,ɛ,ɛ,>,95)
(95,R,ɛ,<,98)
(98,ɛ,R,>,99)
(99,ɛ,ɛ,>,95)
(95,r,ɛ,<,100)
(100,ɛ,r,>,101)
(101,ɛ,ɛ,>,95)
(95,#,ɛ,<,102)
(102,ɛ,#,<,103)
(103,R,R,<,103)
(103,r,r,<,103)
(103,*,*,<,103)
(103,#,#,<,93)
(93,#,#,<,104)
(104,R,R,<,104)
(104,r,r,<,104)
(104,+,+,>,105)
`

const execute = executeWriteSymbol + executeMove

test('cleanup: single input, upper R', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrRrRrrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr##R*#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: single input, lower r', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrrRrrRrrRr RR r'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr##r*#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: input size 2, starting with lower r ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrrRrrRrrRr RR rR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr##r*R#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: input size 2, starting with upper R ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrRrRrrRr RR Rr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr##R*r#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: input size 3, starting with lower r ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrrRrrRrrRr RR rRr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr##r*Rr#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: input size 3, starting with upper R ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrRrRrrRr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr##R*rR#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: long input, starting with lower r ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrrRrrRrrRr RR rRrRRrrRrrrRRR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr##r*RrRRrrRrrrRRR#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: long input, starting with upper R ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrRrRrrRr RR RrRRrrRrRRRrrr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr##R*rRRrrRrRRRrrr#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: long input, starting with lower rs ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrrRrrRrrRr RR rrrRrRRrrRrrrRRR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrrRrrRrrRr##r*rrRrRRrrRrrrRRR#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

test('cleanup: long input, starting with upper Rs ', () => {

    const u = new UTM(init + find + execute + cleanUp,
        'rRrRrRrrRr RR RRRrRRrrRrRRRrrr'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrRrrRr##R*RRrRRrrRrRRRrrr#')
    expect(u.control.state).toBe('q105')
    expect(u.head.position()).toBe(1)
})

const copyNextState = `
(105,r,r,>,105)
(105,R,R,>,106)
(106,r,r,>,106)
(106,R,R,>,107)
(107,r,r,>,107)
(107,R,R,>,108)
(108,r,r,>,108)
(108,R,R,>,109)
(109,r,+,>,110)
(110,R,R,>,110)
(110,r,r,>,110)
(110,#,#,>,111)
(111,r,r,>,111)
(111,#,#,>,112)
(112,R,R,>,112)
(112,r,r,>,112)
(112,*,*,>,112)
(112,#,ɛ,>,113)
(113,ɛ,#,<,114)
(114,ɛ,ɛ,<,114)
(114,*,ɛ,>,115)
(115,ɛ,*,<,114)
(114,R,ɛ,>,116)
(116,ɛ,R,<,114)
(114,r,ɛ,>,117)
(117,ɛ,r,<,114)
(114,#,r,>,118)
(118,ɛ,#,<,119)
(119,r,r,<,119)
(119,#,#,<,120)
(120,R,R,<,120)
(120,r,r,<,120)
(120,+,+,>,121)
(121,r,+,>,110)
(121,R,R,<,122)
(121,#,#,<,122)
(122,R,R,<,122)
(122,r,r,<,122)
(122,+,r,<,122)
`

test('copy: same state', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRr#r#R*#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: different state 2', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRrr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRrr#rr#R*#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: different state 3', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRrrr RR R'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRrrr#rrr#R*#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: same state, longer input', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRr#r#R*rR#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: different state 2, longer input', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRrr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRrr#rr#R*rR#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: different state 3, longer input', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrRrRrrRrrr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrRrRrrRrrr#rrr#R*rR#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: two rules', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrrRrRrrRr R rRrRrRrrRr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrrRrRrrRrRrRrRrRrrRr#r#R*rR#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

test('copy: three rules', () => {

    const u = new UTM(init + find + execute + cleanUp + copyNextState,
        'rRrrRrRrrRr R rrRrRrRrrRrr R rRrRrRrrRrrr RR RrR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('rRrrRrRrrRrRrrRrRrRrrRrrRrRrRrRrrRrrr#rrr#R*rR#')
    expect(u.control.state).toBe('q122')
    expect(u.head.position()).toBe(-1)
})

const restart = cleanUp + copyNextState + `
(122,ɛ,ɛ,>,21)
`

const utm = init + find + execute + restart

test('utm: simple transition', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRrRRRRR'.replaceAll(' ',''))
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRr#r#rrr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(12)
})

test('utm: two rules', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRrr R rrRrRrrRrrRrrr RR RRR'.replaceAll(' ',''))
    //   0 R r > 1      1 R r > 2 
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrrR++RrRrrRrrRrrr#rrr#rr*R#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(28)
})

test('utm: two rules cyclic', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRrr R rrRrRrrRrrRr RR RRR'.replaceAll(' ',''))
    //   0 R r > 1      1 R r > 0 
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrrR++RrRrrRrrRr#rr#rrr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(26)
})

test('utm: two rules flipping upper Rs', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRrr R rrRrRrRrrRr RR RRRRR'.replaceAll(' ',''))
    //   0 R r > 1      1 R R > 0 
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrrR++RrRrRrrRr#rr#rRrRr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(25)
})

test('utm: two rules flipping example (advanced) #1', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRr R rRrrRrRrrRr RR RRrrRR'.replaceAll(' ',''))
        // 0 R r > 0   0 r R > 0
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrR+RrrRrRrrRr#r#rrRRrr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(24)
})

test('utm: two rules flipping example (advanced) #2', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRr R rRrrRrRrrRr RR rRRrrRrR'.replaceAll(' ',''))
        // 0 R r > 0   0 r R > 0
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrR+RrrRrRrrRr#r#RrrRRrRr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(24)
})

test('utm: two rules flipping example (advanced) #3', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRr R rRrrRrRrrRr RR rrRRrrRrR'.replaceAll(' ',''))
        // 0 R r > 0   0 r R > 0
    u.compute()

    expect(u.tape.output()).toBe('+RrRrrRrrRrR+RrrRrRrrRr#r#RRrrRRrRr*#')
    expect(u.control.state).toBe('q123')
    expect(u.head.position()).toBe(24)
})

test('utm: two rules flipping example (from the book)', () => {

    const u = new UTM(utm,
        'rRrRrrRrrRrrRrrRrrRrRrrRr RR RrRrRr'.replaceAll(' ',''))
    
    expect(u.compute()).toBe('rRrRrR')
    expect(u.control.state).toBe('q123')
})

test('utm: generate RrrRrrRrr... (from the book)', () => {

    const u = new UTM(utm,
        'rRrRrRrrRrrRrrRrRrrRrrRrrrRrrrRrRrrRrrRr RR RRRRRRRRRRRRR'.replaceAll(' ',''))
    
    expect(u.compute()).toBe('RrrRrrRrrRrrR')
    expect(u.control.state).toBe('q123')
})

test('utm: add two unary numbers (from the book)', () => {

    const u = new UTM(utm,
        'rRrrRrrRrrRrRrRrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrRrRrRrrrRrrrRrrRrRrrRrrrr RR rrRrrrR'.replaceAll(' ',''))
    const out = u.compute()

    expect(out).toBe('rrrrrRR')
    expect(u.control.state).toBe('q123')
})

test('utm: divide by two (from the book)', () => {

    const u = new UTM(utm,
        'rRrrRrrRrrRrrRrrRrrRrrRrRrrrRrrrRrrRrRrrRrrrrRrrrrRrrRrrRrrRrrrrRrrrrRrRrRrRrrrrrRrrrrrRrrRrrRrRrrrrrrRrrrrrrRrrRrrRrrRrrrrrrrRrrrrrrRrRrRrrRrRrrrrrrrRrrRrRrRrrrrrrrrRrrrrrrrrRrrRrrRrRrrrrrrrrRrrrrrrrrRrRrRrrRrRrrRrRrRrRrrrrrrrrrRrrrrrrrrrRrrRrRrRrrrrrrrrrrRrrrrrrrrrrRrRrrRrRrrrrrrrrrr RR rrrrrrR'.replaceAll(' ',''))
    const out = u.compute()

    expect(out).toBe('rrrRRRR')
})

test('utm: (q0, r, R, q0) (from the book)', () => {

    const u = new UTM(utm,
        'rRrrRrRrrRrRRrrrR')
    const out = u.compute()

    expect(out).toBe('RRRR')
})
