const fetch = require("node-fetch")

export class Waifu {
    /**
     * @description Gets a random image of a waifu
     * @param {WaifuOptions} options - The options for the waifu
     * @returns {Promise<string>} The URL of the image
     */

    async getSfw(
        category:
            | "waifu"
            | "neko"
            | "shinobu"
            | "megumin"
            | "bully"
            | "cuddle"
            | "cry"
            | "hug"
            | "awoo"
            | "kiss"
            | "lick"
            | "pat"
            | "smug"
            | "bonk"
            | "yeet"
            | "bonk"
            | "blush"
            | "smile"
            | "wave"
            | "highfive"
            | "handhold"
            | "nom"
            | "bite"
            | "glomp"
            | "slap"
            | "kill"
            | "kick"
            | "happy"
            | "wink"
            | "poke"
            | "dance"
            | "cringe"
    ): Promise<string> {
        try {
            const url = `https://waifu.pics/api/sfw/${category}`
            const res = await fetch(url)
            const img = await res.json()
            return img.url
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }

    async getNsfw(
        category: "waifu" | "neko" | "trap" | "blowjob"
    ): Promise<string> {
        try {
            const url = `https://waifu.pics/api/nsfw/${category}`
            const res = await fetch(url)
            const img = await res.json()
            return img.url
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }
}
