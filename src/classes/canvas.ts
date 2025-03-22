import { CanvasData } from "../typings/interfaces";
import { createCanvas, loadImage } from "@napi-rs/canvas";

/**
 * @typedef {object} CanvasData
 * @property {number} width - The width of the canvas
 * @property {number} height - The height of the canvas
 * @property {object} background - Background settings
 * @property {string} background.color - The background color
 * @property {string} background.image - Image URL or path
 * @property {string} fontColor - The font color of the canvas
 */

export class Canvas {
    data: CanvasData;
    
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
    constructor(options?: Partial<CanvasData>) {
        this.data = {
            width: options?.width ?? 500,
            height: options?.height ?? 500,
            background: {
                image: options?.background?.image ?? "color",
                color: options?.background?.color ?? "#23272A"
            },
            fontColor: options?.fontColor ?? "#ffffff"
        };
    }

    /**
     * Updates the canvas data
     * @param {Partial<CanvasData>} options - The canvas data to update
     * @returns {Canvas} The canvas instance for chaining
     */
    update(options: Partial<CanvasData>): Canvas {
        if (options.width) this.data.width = options.width;
        if (options.height) this.data.height = options.height;
        if (options.background?.color) this.data.background.color = options.background.color;
        if (options.background?.image) this.data.background.image = options.background.image;
        if (options.fontColor) this.data.fontColor = options.fontColor;
        
        return this;
    }

    /**
     * Prints the canvas data
     * @param {Partial<CanvasData>} options - The canvas data
     * @returns {void}
     */
    print(options?: Partial<CanvasData>): void {
        if (options) {
            this.data = { ...this.data, ...options };
        }
        console.log(this.data);
    }

    /**
     * Renders the canvas
     * @returns {Promise<Buffer>} The rendered canvas as buffer
     */
    async render(): Promise<Buffer> {
        try {
            const canvasElement = createCanvas(this.data.width, this.data.height);
            const ctx = canvasElement.getContext("2d");
            
            // Check if background is an image or color
            if (this.data.background.image && this.data.background.image !== "color") {
                try {
                    // Try to load the image
                    const backgroundImage = await loadImage(this.data.background.image);
                    ctx.drawImage(backgroundImage, 0, 0, this.data.width, this.data.height);
                } catch (error) {
                    console.error(`Failed to load background image: ${error}`);
                    // Fallback to background color
                    ctx.fillStyle = this.data.background.color;
                    ctx.fillRect(0, 0, this.data.width, this.data.height);
                }
            } else {
                // Use background color
                ctx.fillStyle = this.data.background.color;
                ctx.fillRect(0, 0, this.data.width, this.data.height);
            }
            
            return canvasElement.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to render canvas: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Renders the canvas with text
     * @param {string} text - The text to render
     * @param {object} options - Text options
     * @param {string} options.font - Font settings (e.g., "20px Arial")
     * @param {number} options.x - X position
     * @param {number} options.y - Y position
     * @param {string} options.align - Text alignment
     * @returns {Promise<Buffer>} The rendered canvas as buffer
     */
    async renderWithText(
        text: string,
        options: { font?: string; x?: number; y?: number; align?: CanvasTextAlign } = {}
    ): Promise<Buffer> {
        try {
            const canvasElement = createCanvas(this.data.width, this.data.height);
            const ctx = canvasElement.getContext("2d");
            
            // Fill background
            ctx.fillStyle = this.data.background.color;
            ctx.fillRect(0, 0, this.data.width, this.data.height);
            
            // Set text properties
            ctx.font = options.font || "30px Arial";
            ctx.fillStyle = this.data.fontColor;
            ctx.textAlign = options.align || "center";
            
            // Calculate text position if not specified
            const x = options.x ?? this.data.width / 2;
            const y = options.y ?? this.data.height / 2;
            
            // Draw text
            ctx.fillText(text, x, y);
            
            return canvasElement.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to render canvas with text: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
