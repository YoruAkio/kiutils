import { Rank } from "canvacord"

export interface CanvasData {
    width: number
    height: number
    background: {
        color: string
        image: string
    }
    fontColor: string
}

export interface RankData {
    width: number
    height: number
    background: {
        type?: "image" | "color"
        image?: string | Buffer
    }
    progressBar: {
        rounded?: boolean
        x?: number
        y?: number
        height?: number
        width?: number
        track?: {
            color?: string
        }
        bar?: {
            type?: "color" | "gradient"
            color?: string | string[]
        }
    }
    overlay: {
        display?: boolean
        level?: number
        color?: string
    }
    avatar: {
        source?: string | Buffer
        x?: number
        y?: number
        height?: number
        width?: number
    }
    status: {
        width?: number
        type?: "online" | "dnd" | "idle" | "offline" | "streaming"
        color?: string
        circle?: boolean
    }
    rank: {
        display?: boolean
        data?: number
        textColor?: string
        color?: string
        displayText?: string
    }
    level: {
        display?: boolean
        data?: number
        textColor?: string
        color?: string
        displayText?: string
    }
    currentXP: {
        data?: number
        color?: string
    }
    requiredXP: {
        data?: number
        color?: string
    }
    discriminator: {
        discrim?: number | string
        color?: string
    }
    username: {
        name?: string
        color?: string
    }
    renderEmojis?: boolean
}
