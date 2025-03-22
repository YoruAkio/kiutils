/**
 * Generates a random string of specified length
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 * @example
 * const { randString } = require("kiutils")
 * const random = randString(10)
 * console.log(random) // => "a1b2c3d4e5"
 */
export function randString(length: number): string {
    if (length === undefined || length === null) {
        throw new Error("The parameter 'length' is missing");
    }
    if (typeof length !== "number") {
        throw new TypeError("The parameter 'length' must be a number");
    }
    if (length <= 0) {
        throw new Error("The parameter 'length' must be a positive number");
    }

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => 
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
}