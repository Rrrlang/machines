const URM = require('./urm')

const urm = `
0 JZDEC c 1 0
1 JZDEC P 2 4
2 JZDEC a 7 3
3 INC a 10
4 JZDEC a 6 5
5 INC c 1
6 INC P 10
7 JZDEC c 44 8
8 INC P 9
9 INC a 7
10 JZDEC c 13 11
11 INC P 12
12 INC a 10

13 INC p 14

14 JZDEC c 15 14
15 JZDEC P 16 18
16 JZDEC c1 21 17
17 INC c1 24
18 JZDEC c1 20 19
19 INC c 15
20 INC P 24
21 JZDEC c 40 22
22 INC P 23
23 INC c1 21
24 JZDEC c 27 25
25 INC P 26
26 INC c1 24

27 JZDEC c 28 27
28 JZDEC P 29 31
29 JZDEC c2 34 30
30 INC c2 37
31 JZDEC c2 33 32
32 INC c 28
33 INC P 37
34 JZDEC c 43 35
35 INC P 36
36 INC c2 34
37 JZDEC c 42 38
38 INC P 39
39 INC c2 37

40 INC p 41
41 INC p 42
42 INC p 0
43 INC p 40

44 INC p 45

45 JZDEC c 46 45
46 JZDEC P 47 49
47 JZDEC c1 52 48
48 INC c1 55
49 JZDEC c1 51 50
50 INC c 46
51 INC P 55
52 JZDEC c 58 53
53 INC P 54
54 INC c1 52
55 JZDEC c 83 56
56 INC P 57
57 INC c1 55

58 INC p 59

59 JZDEC a 60 59
60 JZDEC c 61 60
61 JZDEC P 62 64
62 JZDEC c 66 63
63 INC P 62
64 INC a 65
65 INC c 61

66 JZDEC b 67 66
67 JZDEC c 68 67
68 JZDEC A 69 71
69 JZDEC c 73 70
70 INC A 69
71 INC b 72
72 INC c 68

73 INC B 74
74 INC p 75

75 JZDEC a 76 75
76 JZDEC c 77 76
77 JZDEC P 78 80
78 JZDEC c 82 79
79 INC P 78
80 INC a 81
81 INC c 77

82 JZDEC p 0 82

83 JZDEC c 84 83
84 JZDEC P 85 87
85 JZDEC c2 90 86
86 INC c2 93
87 JZDEC c2 89 88
88 INC c 84
89 INC P 93
90 JZDEC c 96 91
91 INC P 92
92 INC c2 90
93 JZDEC c 113 94
94 INC P 95
95 INC c2 93

96 INC p 97

97 JZDEC a 98 97
98 JZDEC c 99 98
99 JZDEC P 100 102
100 JZDEC c 104 101
101 INC P 100
102 INC a 103
103 INC c 99

104 JZDEC b 105 104
105 JZDEC c 106 105
106 JZDEC A 107 109
107 JZDEC c 111 108
108 INC A 107
109 INC b 110
110 INC c 106

111 JZDEC B 74 112
112 INC p 74

113 HALT
`

test('URM: trivial program', () => {

    const input = [
        0, 1, 6, 1, // 0: INC 6 1
        1, 3,       // 1: HALT
        7,          // reg. 6 -> reg. 7
        0           // reg. 7 = 0 (data)
    ]
    const u = new URM(urm, input)
    expect(u.compute()).toBe('0 1 6 1 1 3 7 1')
})

test('URM: simple program', () => {

    const input = [
        0, 1, 11, 1,    // 0: INC 11 1
        1, 2, 11, 2, 1, // 1: JZDEC 11 2 1
        2, 3,           // 2: HALT
        12,             // reg. 11 -> reg. 12
        0               // reg. 12 = 0 (data)
    ]
    const u = new URM(urm, input)
    expect(u.compute()).toBe('0 1 11 1 1 2 11 2 1 2 3 12 0')
})

test('URM: copy program', () => {

    const input = [
        0, 2, 36, 1, 0,     // 0: JZDEC k 1 0
        1, 2, 34, 2, 1,     // 1: JZDEC a 2 1
        2, 2, 35, 3, 5,     // 2: JZDEC j 3 5 
        3, 2, 34, 7, 4,     // 3: JZDEC a 7 4
        4, 1, 35, 3,        // 4: INC j 3
        5, 1, 36, 6,        // 5: INC k 6
        6, 1, 34, 2,        // 6: INC a 2
        7, 3,               // 7: HALT
        37,                 // reg. 34 [a] -> reg. 37
        38,                 // reg. 35 [j] -> reg. 38
        39,                 // reg. 36 [k] -> reg. 39
        0,                  // reg. 37 [A] = 0
        123,                // reg. 38 [J] = 123 (data)
        99                  // reg. 39 [K] = 99 (data)
    ]
    const u = new URM(urm, input)
    expect(u.compute()).toBe('0 2 36 1 0 1 2 34 2 1 2 2 35 3 5 3 2 34 7 4 4 1 35 3 5 1 36 6 6 1 34 2 7 3 37 38 39 0 123 123')
})
