import * as fs from "fs";
import * as fsPromises from "fs/promises";

export class Utils {
    /**
     * Writes the data as file
     * @param {Buffer|string} data data to write
     * @param {string} name file name
     * @returns {void}
     */
    static write(data: Buffer | string, name: string): void {
        if (!data) throw new Error("The parameter 'data' is missing");
        if (!name) throw new Error("The parameter 'name' is missing");
        
        return fs.writeFileSync(name, data);
    }

    /**
     * Asynchronously writes the data as file
     * @param {Buffer|string} data data to write
     * @param {string} name file name
     * @returns {Promise<void>}
     */
    static async writeAsync(data: Buffer | string, name: string): Promise<void> {
        if (!data) throw new Error("The parameter 'data' is missing");
        if (!name) throw new Error("The parameter 'name' is missing");
        
        return fsPromises.writeFile(name, data);
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
    static read(name: string): Buffer {
        if (!name) throw new Error("The parameter 'name' is missing");
        
        return fs.readFileSync(name);
    }

    /**
     * Asynchronously reads the file as buffer
     * @param {string} name file name
     * @returns {Promise<Buffer>} file data
     */
    static async readAsync(name: string): Promise<Buffer> {
        if (!name) throw new Error("The parameter 'name' is missing");
        
        return fsPromises.readFile(name);
    }
}
