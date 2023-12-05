const plus = 76
console.log(`
0 JZDEC b 1 0
1 JZDEC j 2 4
2 JZDEC k 7 3
3 INC k 10
4 JZDEC k 6 5
5 INC b 1
6 INC j 10
7 JZDEC b Yes 8
8 INC j 9
9 INC k 7
10 JZDEC b No 11
11 INC j 12
12 INC k 10
`
.split(/\r?\n/)
.map(l => l.trim())
.filter(l => !!l)
.map(l => l.split(/\s+/).map(c => Number.isInteger(c-0) ? (c-0+plus) : c).join(' '))
.join('\n')
)
