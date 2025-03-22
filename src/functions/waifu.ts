import fetch from "node-fetch";

export enum WaifuType {
    SFW = "sfw",
    NSFW = "nsfw"
}

interface WaifuResponse {
    url: string;
}

/**
 * @typedef {Object} WaifuData
 * @property {string[]} categoryNsfw - The NSFW categories
 * @property {string[]} categorySfw - The SFW categories
 * @property {string} type - The type of the image
 * @example
 * const { waifu } = require("kiutils")
 * waifu("sfw").then(console.log)
 *
 * // => "https://..."
 */
export async function waifu(type: WaifuType = WaifuType.SFW): Promise<string> {
    try {
        const res = await fetch(`https://api.waifu.pics/${type}/waifu`);
        
        if (!res.ok) {
            throw new Error(`Failed to fetch waifu: ${res.statusText}`);
        }
        
        const data = await res.json() as WaifuResponse;
        return data.url;
    } catch (error) {
        throw new Error(`Error fetching waifu: ${error instanceof Error ? error.message : String(error)}`);
    }
}
