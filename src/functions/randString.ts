export function randString(length: number) {
    if (!length) throw new Error("The parameter 'length' is missing")
    if (typeof length !== "number")
        throw new TypeError("The parameter 'length' must be a number")

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return result
}