/**
 * Prints the input to the console as string
 * @param {any} input - The text to print
 * @returns {void}
 * @example
 * const { print } = require("kiutils")
 * print("Hello World")
 */
export function print(input: any): void {
    if (input === undefined || input === null) {
        throw new Error("The parameter 'input' is missing");
    }
    
    console.log(String(input));
}
