module.exports = (tm, alphabet) => tm.replaceAll(/\s/g,'').replaceAll(')','').replace('(','').split('(')
    .map(tuple => tuple.split(',').map((v,i) => {
            switch (i) {
                case 0: case 4: {   // states
                    const n = parseInt(v.replace('q',''))
                    let q = 'r'
                    for (let i = 0; i < n; i++) q += 'r'
                    return q
                }
                case 1: case 2: {   // read & write symbol
                    const n = alphabet.indexOf(v)
                    let s = 'r'
                    for (let i = 0; i < n; i++) s += 'r'
                    return s
                }
                case 3: {           // move action
                    if ('<' === v) return 'r'
                    if ('>' === v) return 'rr'
                }
            }
        }).join('R')  // join parts of a tuple
    ).join('R')  // join tuples
