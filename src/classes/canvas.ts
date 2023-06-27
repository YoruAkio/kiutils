import { CanvasData } from "../typings/interfaces"

const canvas = require("@napi-rs/canvas")

/**
 * @typedef {object} CanvasData
 * @property {number} width - The width of the canvas
 * @property {number} height - The height of the canvas
 * @property {string} bgColor - The background color of the canvas
 * @property {string} fontColor - The font color of the canvas
 */

export class Canvas {
    data: CanvasData
    
    /**
     * The Canvas constructor
     * @constructor
     * @param {CanvasData} options - The canvas data
     * @example
     * const { Canvas } = require("kiutils")
     * const canvas = new Canvas({
     *     width: 500,
     *     height: 500,
     *     background: {
     *         image: "color",
     *         color: "#23272A"
     *     },   
     *     fontColor: "#ffffff"
     * })
     * 
     * canvas.render()
     */

    constructor() {
        this.data = {
            width: 0,
            height: 0,
            background: {
                image: "color",
                color: "#23272A"
            },
            fontColor: "#ffffff"
        }
    }

    /**
     * Prints the canvas data
     * @param {CanvasData} options - The canvas data
     * @returns {void}
     */
    print(options: CanvasData): void {
        this.data = options
        console.log(this.data)
    }
}
