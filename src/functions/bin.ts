import axios from "axios";

interface SourceBinResponse {
    key: string;
    created: string;
    // Add other fields as needed
}

/**
 * Uploads the code to sourceb.in
 * @param {string} code - Code to upload
 * @returns {Promise<string>} url of the uploaded code
 * @example
 * const { bin } = require("kiutils")
 * bin("console.log('Hello World')").then(console.log)
 */
export async function bin(code: string): Promise<string> {
    if (!code) throw new Error("The parameter 'code' is missing");
    if (typeof code !== "string")
        throw new TypeError("The parameter 'code' must be a string");

    try {
        const response = await axios.post<SourceBinResponse>("https://sourceb.in/api/bins", {
            files: [
                {
                    content: code
                }
            ]
        });
        
        return `https://sourceb.in/${response.data.key}`;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to upload to sourceb.in: ${error.message}`);
        }
        throw error;
    }
}
