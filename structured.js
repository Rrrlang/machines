/** A Turing machine implementation with building blocks of structured programming */
/** Fixed alphabet { R, r } */

function tm(program, input) {

    var p = program,            // program
        t = Array.from(input),  // tape

        q = 1,       // current status
        h = 0,       // head position
        i = 0,       // instruction index
        x = 1,       // execution runs
        s, r, w, m   // locals (state, read, write, move)

    while (x == 1) {
        // reset locals
        s = r = w = m = 0
        // rule's starting state
        while (p[i] == 'r') {
            i = i + 1
            s = s + 1
        }
        // states match
        if (s == q) {
            // next element
            i = i + 1
            // rule's read symbol
            while (p[i] == 'r') {
                i = i + 1
                r = r + 1
            }
            if (r == 1 && t[h] == 'R' ||
                r == 2 && t[h] == 'r') {
                // read symbols match
                r = 0
                // next element
                i = i + 1
                // write operation
                while (p[i] == 'r') {
                    i = i + 1
                    w = w + 1
                }
                if (w == 1) t[h] = 'R'
                if (w == 2) t[h] = 'r'
                // next element
                i = i + 1
                // move operation
                while (p[i] == 'r') {
                    i = i + 1
                    m = m + 1
                }
                if (m == 1) h = h - 1
                if (m == 2) h = h + 1
                // next element
                i = i + 1
                // next state
                s = 0
                while (p[i] == 'r') {
                    i = i + 1
                    s = s + 1
                }
                q = s
                // reset
                i = 0
            } // read symbols match
        } // states match

        // no match
        if (s != q || r != 0) { 
            // skip remaining elements
            i = i + 1
            while (p[i] == 'r') i = i + 1
            i = i + 1
            while (p[i] == 'r') i = i + 1
            i = i + 1
            while (p[i] == 'r') i = i + 1
            // one element more when
            // no read symbol was checked
            if (r == 0) {
                i = i + 1
                while (p[i] == 'r') i = i + 1
            }
            // no rule left
            if (!p[i]) x = 0
            // separator of quintuples
            i = i + 1 
        } // no match
    } // running
    return t.join('')
}

console.log(tm('rRrrRrRrrRr', 'rrrR')) // RRRR
console.log(tm('rRrRrrRrrRrrRrrRrrRrRrrRr', 'RrRrRr')) // rRrRrR
console.log(tm('rRrRrRrrRrrRrrRrRrrRrrRrrrRrrrRrRrrRrrRr', 'RRRRRRRRRRRRR')) // RrrRrrRrrRrrR
console.log(tm('rRrrRrrRrrRrRrRrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrRrRrRrrrRrrrRrrRrRrrRrrrr', 'rrRrrrR')) // rrrrrRR
console.log(tm('rRrrRrrRrrRrrRrrRrrRrrRrRrrrRrrrRrrRrRrrRrrrrRrrrrRrrRrrRrrRrrrrRrrrrRrRrRrRrrrrrRrrrrrRrrRrrRrRrrrrrrRrrrrrrRrrRrrRrrRrrrrrrrRrrrrrrRrRrRrrRrRrrrrrrrRrrRrRrRrrrrrrrrRrrrrrrrrRrrRrrRrRrrrrrrrrRrrrrrrrrRrRrRrrRrRrrRrRrRrRrrrrrrrrrRrrrrrrrrrRrrRrRrRrrrrrrrrrrRrrrrrrrrrrRrRrrRrRrrrrrrrrrr', 'rrrrrrrrR')) // rrrrRRRRR