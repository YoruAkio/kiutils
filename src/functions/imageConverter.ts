import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

/**
 * Supported image formats for conversion
 */
export enum ImageFormat {
    PNG = "png",
    JPEG = "jpeg",
    JPG = "jpeg",
    WEBP = "webp",
    AVIF = "avif",
    TIFF = "tiff",
    GIF = "gif",
    HEIF = "heif"
}

export interface ConversionOptions {
    /**
     * Quality of the output image (1-100), applies to lossy formats
     */
    quality?: number;
    /**
     * Width of the output image. If only width is specified, height will be calculated to maintain aspect ratio
     */
    width?: number;
    /**
     * Height of the output image. If only height is specified, width will be calculated to maintain aspect ratio
     */
    height?: number;
    /**
     * Whether to fit the image within the specified dimensions (default: true)
     */
    fit?: "cover" | "contain" | "fill" | "inside" | "outside";
    /**
     * Whether to optimize the output image (default: true)
     */
    optimize?: boolean;
    /**
     * Whether to preserve EXIF metadata (default: false)
     */
    withMetadata?: boolean;
}

/**
 * Converts an image from one format to another using Sharp
 * @param {string|Buffer} input - Path to the source image or image buffer
 * @param {ImageFormat} format - Target format to convert to
 * @param {ConversionOptions} options - Additional conversion options
 * @returns {Promise<Buffer>} Converted image as buffer
 * @example
 * const { convertImage, ImageFormat } = require("kiutils");
 * 
 * // Convert from file path
 * convertImage("image.png", ImageFormat.WEBP)
 *   .then(buffer => fs.writeFileSync("image.webp", buffer));
 * 
 * // Convert from buffer with options
 * const inputBuffer = fs.readFileSync("image.jpg");
 * convertImage(inputBuffer, ImageFormat.PNG, { width: 800 })
 *   .then(buffer => fs.writeFileSync("resized.png", buffer));
 */
export async function convertImage(
    input: string | Buffer,
    format: ImageFormat,
    options: ConversionOptions = {}
): Promise<Buffer> {
    try {
        // Initialize Sharp with the input
        let imageProcessor = typeof input === "string" 
            ? sharp(input) 
            : sharp(input);
        
        // Apply resizing if width or height is specified
        if (options.width || options.height) {
            imageProcessor = imageProcessor.resize({
                width: options.width,
                height: options.height,
                fit: options.fit || "contain",
                withoutEnlargement: true
            });
        }
        
        // Preserve metadata if requested
        if (options.withMetadata) {
            imageProcessor = imageProcessor.withMetadata();
        }
        
        // Apply format-specific options
        switch (format) {
            case ImageFormat.PNG:
                imageProcessor = imageProcessor.png({
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    progressive: true
                });
                break;
                
            case ImageFormat.JPEG:
            case ImageFormat.JPG:
                imageProcessor = imageProcessor.jpeg({
                    quality: options.quality || 80,
                    progressive: true,
                    optimizeCoding: true
                });
                break;
                
            case ImageFormat.WEBP:
                imageProcessor = imageProcessor.webp({
                    quality: options.quality || 80,
                    lossless: options.quality === 100,
                    nearLossless: options.quality === 100
                });
                break;
                
            case ImageFormat.AVIF:
                imageProcessor = imageProcessor.avif({
                    quality: options.quality || 60,
                    lossless: options.quality === 100
                });
                break;
                
            case ImageFormat.TIFF:
                imageProcessor = imageProcessor.tiff({
                    quality: options.quality || 80,
                    compression: 'lzw'
                });
                break;
                
            case ImageFormat.GIF:
                imageProcessor = imageProcessor.gif();
                break;
                
            case ImageFormat.HEIF:
                imageProcessor = imageProcessor.heif({
                    quality: options.quality || 80
                });
                break;
                
            default:
                throw new Error(`Unsupported output format: ${format}`);
        }
        
        // Process and return the image buffer
        return await imageProcessor.toBuffer();
    } catch (error) {
        throw new Error(`Failed to convert image: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Converts an image file from one format to another and saves to a file
 * @param {string} inputPath - Path to the source image
 * @param {string} outputPath - Path where the converted image will be saved
 * @param {ConversionOptions} options - Additional conversion options
 * @returns {Promise<string>} Path to the converted image
 * @example
 * const { convertImageFile, ImageFormat } = require("kiutils");
 * 
 * // Convert PNG to JPEG
 * convertImageFile("image.png", "converted.jpg", { quality: 90 })
 *   .then(outputPath => console.log(`Converted image saved to ${outputPath}`));
 */
export async function convertImageFile(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions = {}
): Promise<string> {
    if (!inputPath) throw new Error("The parameter 'inputPath' is missing");
    if (!outputPath) throw new Error("The parameter 'outputPath' is missing");
    
    try {
        // Determine format from output file extension
        const extension = path.extname(outputPath).toLowerCase().slice(1);
        const format = extension as ImageFormat;
        
        if (!Object.values(ImageFormat).includes(format)) {
            throw new Error(`Unsupported output format: ${extension}`);
        }
        
        // For file-to-file conversion, we can use Sharp's built-in toFile method
        // which is more efficient than writing buffer to file
        const imageProcessor = sharp(inputPath);
        
        // Apply resizing if width or height is specified
        if (options.width || options.height) {
            imageProcessor.resize({
                width: options.width,
                height: options.height,
                fit: options.fit || "contain",
                withoutEnlargement: true
            });
        }
        
        // Preserve metadata if requested
        if (options.withMetadata) {
            imageProcessor.withMetadata();
        }
        
        // Apply format-specific options
        switch (format) {
            case ImageFormat.PNG:
                imageProcessor.png({
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    progressive: true
                });
                break;
                
            case ImageFormat.JPEG:
            case ImageFormat.JPG:
                imageProcessor.jpeg({
                    quality: options.quality || 80,
                    progressive: true,
                    optimizeCoding: true
                });
                break;
                
            case ImageFormat.WEBP:
                imageProcessor.webp({
                    quality: options.quality || 80,
                    lossless: options.quality === 100,
                    nearLossless: options.quality === 100
                });
                break;
                
            case ImageFormat.AVIF:
                imageProcessor.avif({
                    quality: options.quality || 60,
                    lossless: options.quality === 100
                });
                break;
                
            case ImageFormat.TIFF:
                imageProcessor.tiff({
                    quality: options.quality || 80,
                    compression: 'lzw'
                });
                break;
                
            case ImageFormat.GIF:
                imageProcessor.gif();
                break;
                
            case ImageFormat.HEIF:
                imageProcessor.heif({
                    quality: options.quality || 80
                });
                break;
        }
        
        // Save to file
        await imageProcessor.toFile(outputPath);
        
        return outputPath;
    } catch (error) {
        throw new Error(`Failed to convert image file: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Creates image thumbnails quickly and efficiently
 * @param {string|Buffer} input - Path to the source image or image buffer
 * @param {number} width - Thumbnail width
 * @param {number} height - Thumbnail height (optional, will maintain aspect ratio if omitted)
 * @param {ImageFormat} format - Output format (default: png)
 * @returns {Promise<Buffer>} Thumbnail image as buffer
 * @example
 * const { createThumbnail, ImageFormat } = require("kiutils");
 * 
 * createThumbnail("large-image.jpg", 200)
 *   .then(buffer => fs.writeFileSync("thumbnail.png", buffer));
 */
export async function createThumbnail(
    input: string | Buffer,
    width: number,
    height?: number,
    format: ImageFormat = ImageFormat.PNG
): Promise<Buffer> {
    if (!input) throw new Error("The parameter 'input' is missing");
    if (!width) throw new Error("The parameter 'width' is missing");
    
    try {
        // Initialize Sharp with the input
        const imageProcessor = typeof input === "string" 
            ? sharp(input) 
            : sharp(input);
        
        // Create the thumbnail
        imageProcessor.resize({
            width,
            height,
            fit: "inside",
            withoutEnlargement: true
        });
        
        // Set output format
        switch (format) {
            case ImageFormat.PNG:
                imageProcessor.png({ compressionLevel: 9 });
                break;
            case ImageFormat.JPEG:
            case ImageFormat.JPG:
                imageProcessor.jpeg({ quality: 80 });
                break;
            case ImageFormat.WEBP:
                imageProcessor.webp({ quality: 80 });
                break;
            default:
                imageProcessor.toFormat(format);
        }
        
        // Return the thumbnail buffer
        return await imageProcessor.toBuffer();
    } catch (error) {
        throw new Error(`Failed to create thumbnail: ${error instanceof Error ? error.message : String(error)}`);
    }
}
