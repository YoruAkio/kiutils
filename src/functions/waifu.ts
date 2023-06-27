const fetch = require("node-fetch")

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

export async function waifu(type: "sfw" | "nsfw" = "sfw") {
    const res = await fetch(`https://api.waifu.pics/${type}/waifu`)
    const data = await res.json()
    return data.url
}
