/**
 * Prints the input to the console as string
 * @param {any} input - The text to print
 * @returns {Promise<void>}
 * @example
 * const { print } = require("kiutils")
 * print("Hello World").then(console.log)
 */
export async function print(input: any): Promise<void> {
    const value = input as string
    if (!value) throw new Error("The parameter 'input' is missing")

    console.log(value)
}
