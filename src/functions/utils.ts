const fs = require("fs")

export class Utils {
    /**
     * Writes the data as file
     * @param {Buffer} data data to write
     * @param {string} name file name
     * @returns {void}
     */
    static write(data, name) {
        return fs.writeFileSync(name, data)
    }

    /**
     * Reads the file as buffer
     * @param {string} name file name
     * @returns {Buffer} file data
     * @example
     * const { Utils } = require("kiutils")
     * const data = Utils.read("file.txt")
     * console.log(data.toString())
     * // => "Hello World!"
     */
    static read(name) {
        return fs.readFileSync(name)
    }
}
