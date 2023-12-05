/** Halting problem without loops
 * 
 * This program evaluates a JS file referenced in the argument:
 * 
 *      node evaluate.js math.js
 * 
 * For non-halting behavior run it with self as an argument:
 * 
 *      node evaluate.js evaluate.js
 */

const readProgram = () => {
    // read a program from a file 
    // provided as an argument
    return require('fs').readFileSync(process.argv[2]).toString()
}

const program = readProgram()
const output = eval(program)

console.log(output)