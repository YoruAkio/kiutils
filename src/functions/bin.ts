const axios = require("axios")

/**
 * Uploads the code to sourceb.in
 * @param {string} code - Code to upload
 * @returns {Promise<string>} url of the uploaded code
 * @example
 * const { bin } = require("kiutils")
 * bin("console.log('Hello World')").then(console.log)
 */

export async function bin(code: string) {
    if (!code) throw new Error("The parameter 'code' is missing")
    if (typeof code !== "string")
        throw new TypeError("The parameter 'code' must be a string")

    const a = await axios("https://sourceb.in/api/bins", {
        method: "POST",
        data: {
            files: [
                {
                    content: code
                }
            ]
        }
    })
    return `https://sourceb.in/${a.data.key}`
}
