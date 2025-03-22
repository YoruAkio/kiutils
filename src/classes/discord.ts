import { createCanvas, loadImage, SKRSContext2D } from "@napi-rs/canvas";
import { RankData } from "../typings/interfaces";
import { StatusType } from "../typings/enums";

export class Discord {
    /**
     * Creates a rank card for Discord users with improved styling
     * @param {RankData} options - Rank card options
     * @returns {Promise<Buffer>} The generated rank card as a buffer
     * @example
     * const { Discord } = require("kiutils");
     * const rankCard = await new Discord().createRankCard({
     *   username: { name: "User" },
     *   level: { data: 5, display: true },
     *   currentXP: { data: 300 },
     *   requiredXP: { data: 500 }
     * });
     */
    async createRankCard(options: Partial<RankData> = {}): Promise<Buffer> {
        // Default values
        const rankData: RankData = {
            width: options.width ?? 934,
            height: options.height ?? 282,
            background: {
                type: options.background?.type ?? "color",
                image: options.background?.image ?? "#23272A"
            },
            progressBar: {
                rounded: options.progressBar?.rounded ?? true,
                x: options.progressBar?.x ?? 275.5,
                y: options.progressBar?.y ?? 170, // Moved down for better spacing
                height: options.progressBar?.height ?? 25, // Smaller height
                width: options.progressBar?.width ?? 596.5,
                track: {
                    color: options.progressBar?.track?.color ?? "#484b4e"
                },
                bar: {
                    type: options.progressBar?.bar?.type ?? "color",
                    color: options.progressBar?.bar?.color ?? "#5865F2" // Discord blue
                }
            },
            overlay: {
                display: options.overlay?.display ?? true,
                level: options.overlay?.level ?? 0.3, // Reduced opacity
                color: options.overlay?.color ?? "#1E2124" // Darker overlay
            },
            avatar: {
                source: options.avatar?.source ?? "",
                x: options.avatar?.x ?? 42,
                y: options.avatar?.y ?? 45, // Adjusted position
                height: options.avatar?.height ?? 200,
                width: options.avatar?.width ?? 200
            },
            status: {
                width: options.status?.width ?? 5,
                type: options.status?.type ?? StatusType.ONLINE,
                color: options.status?.color ?? this.getStatusColor(options.status?.type as StatusType),
                circle: options.status?.circle ?? true // Set to true by default for a modern look
            },
            rank: {
                display: options.rank?.display ?? true,
                data: options.rank?.data ?? 1,
                textColor: options.rank?.textColor ?? "#ffffff",
                color: options.rank?.color ?? "#A3A6AA", // More subtle color
                displayText: options.rank?.displayText ?? "RANK"
            },
            level: {
                display: options.level?.display ?? true,
                data: options.level?.data ?? 1,
                textColor: options.level?.textColor ?? "#ffffff",
                color: options.level?.color ?? "#A3A6AA", // More subtle color
                displayText: options.level?.displayText ?? "LEVEL"
            },
            currentXP: {
                data: options.currentXP?.data ?? 0,
                color: options.currentXP?.color ?? "#A3A6AA" // More subtle color
            },
            requiredXP: {
                data: options.requiredXP?.data ?? 100,
                color: options.requiredXP?.color ?? "#A3A6AA" // More subtle color
            },
            discriminator: {
                discrim: options.discriminator?.discrim ?? "0000",
                color: options.discriminator?.color ?? "#A3A6AA" // More subtle color
            },
            username: {
                name: options.username?.name ?? "User",
                color: options.username?.color ?? "#ffffff"
            },
            renderEmojis: options.renderEmojis ?? false
        };

        // Create a canvas with the specified dimensions
        const canvas = createCanvas(rankData.width, rankData.height);
        const ctx = canvas.getContext("2d");

        // Apply rounded corners to the entire card
        this.roundRect(ctx, 0, 0, canvas.width, canvas.height, 16);
        ctx.clip();

        // Draw background
        if (rankData.background.type === "color") {
            ctx.fillStyle = (rankData.background.image as string) || "#23272A";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (rankData.background.type === "image" && rankData.background.image) {
            const backgroundImage = await loadImage(rankData.background.image);
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        }

        // Apply overlay if enabled
        if (rankData.overlay.display) {
            ctx.fillStyle = rankData.overlay.color || "#1E2124";
            ctx.globalAlpha = rankData.overlay.level || 0.3;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
        }

        // Draw avatar if provided
                if (rankData.avatar.source) {
            try {
                const avatar = await loadImage(rankData.avatar.source);
                
                // Calculate vertical center position
                const avatarWidth = rankData.avatar.width || 200;
                const avatarHeight = rankData.avatar.height || 200;
                const avatarX = 55; // Fixed left position
                const avatarY = (rankData.height / 2) - (avatarHeight / 2); // Vertically centered
                
                // Create circular avatar
                ctx.save();
                ctx.beginPath();
                ctx.arc(
                    avatarX + avatarWidth / 2,
                    avatarY + avatarHeight / 2,
                    avatarWidth / 2,
                    0,
                    Math.PI * 2
                );
                ctx.closePath();
                ctx.clip();
                
                // Draw the avatar
                ctx.drawImage(
                    avatar,
                    avatarX,
                    avatarY,
                    avatarWidth,
                    avatarHeight
                );
                
                // Draw a subtle border around avatar
                ctx.strokeStyle = "#ffffff26";
                ctx.lineWidth = 4;
                ctx.stroke();
                
                ctx.restore();
                
                // Draw status indicator
                if (rankData.status.type) {
                    // Position the status at the bottom right of avatar
                    const statusX = avatarX + avatarWidth - 20;
                    const statusY = avatarY + avatarHeight - 20;
                    const statusSize = (rankData.status.width || 5) * 4;
                    
                    // Add status border
                    ctx.beginPath();
                    ctx.arc(
                        statusX,
                        statusY,
                        statusSize,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = "#2A2C31";
                    ctx.fill();
                    
                    // Create smaller circle for status
                    ctx.beginPath();
                    ctx.arc(
                        statusX,
                        statusY,
                        (rankData.status.width || 5) * 3,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = rankData.status.color || "#43b581";
                    ctx.fill();
                }
            } catch (error) {
                console.error("Failed to load avatar:", error);
            }
        }

        // Draw username with a modern font
        ctx.font = "bold 32px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = rankData.username.color || "#ffffff";
        ctx.textAlign = "left";
        
        // Username placement
        // const usernameX = (rankData.avatar.x || 0) + (rankData.avatar.width || 0) + 55;
        // const usernameY = (rankData.avatar.y || 0) + 50;
        const usernameX = 275;
        const usernameY = 100;
        
        ctx.fillText(
            rankData.username.name || "User",
            usernameX,
            usernameY
        );
        
        // Draw discriminator if available - with smaller modern font
        if (rankData.discriminator.discrim) {
            ctx.font = "18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            ctx.fillStyle = rankData.discriminator.color || "#A3A6AA";
            const usernameWidth = ctx.measureText(rankData.username.name || "User").width;
            ctx.fillText(
                `#${rankData.discriminator.discrim}`,
                usernameX + usernameWidth + 50,
                usernameY
            );
        }

        // Draw level info in a more compact format
        if (rankData.level.display) {
            // Level label with smaller font
            ctx.font = "18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            ctx.fillStyle = rankData.level.color || "#A3A6AA";
            ctx.textAlign = "left";
            ctx.fillText(
                rankData.level.displayText || "LEVEL",
                usernameX,
                usernameY + 35
            );
            
            // Level value with bolder font
            ctx.font = "bold 24px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            ctx.fillStyle = rankData.level.textColor || "#ffffff";
            ctx.fillText(
                `${rankData.level.data}`,
                usernameX + 70,
                usernameY + 35
            );
        }

        // Draw rank with improved layout
        if (rankData.rank.display) {
            ctx.font = "18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            ctx.fillStyle = rankData.rank.color || "#A3A6AA";
            ctx.textAlign = "left";
            ctx.fillText(
                rankData.rank.displayText || "RANK",
                usernameX + 140,
                usernameY + 35
            );
            
            ctx.font = "bold 22px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            ctx.fillStyle = rankData.rank.textColor || "#ffffff";
            ctx.fillText(
                `#${rankData.rank.data}`,
                usernameX + 205,
                usernameY + 35
            );
        }

        // Draw progress bar with improved style
        ctx.beginPath();
        ctx.fillStyle = rankData.progressBar?.track?.color || "#2A2C31";
        
        if (rankData.progressBar.rounded) {
            // Rounded progress track with slightly elevated look
            this.roundRect(
                ctx,
                rankData.progressBar.x || 0,
                rankData.progressBar.y || 0,
                rankData.progressBar.width || 0,
                rankData.progressBar.height || 0,
                (rankData.progressBar.height || 0) / 2
            );
        } else {
            // Regular progress track
            ctx.rect(
                rankData.progressBar.x || 0,
                rankData.progressBar.y || 0,
                rankData.progressBar.width || 0,
                rankData.progressBar.height || 0
            );
        }
        ctx.fill();

        // Calculate progress
        const progress = Math.min(
            (rankData.currentXP.data || 0) / (rankData.requiredXP.data || 1),
            1
        );
        const progressWidth = (rankData.progressBar.width || 0) * progress;

        // Draw progress bar fill - modern style
        ctx.beginPath();
        if (rankData.progressBar.bar?.type === "gradient" && Array.isArray(rankData.progressBar.bar?.color)) {
            const gradient = ctx.createLinearGradient(
                rankData.progressBar.x || 0,
                rankData.progressBar.y || 0,
                (rankData.progressBar.x || 0) + (rankData.progressBar.width || 0),
                rankData.progressBar.y || 0
            );
            const colors = rankData.progressBar.bar.color;
            colors.forEach((color, index) => {
                gradient.addColorStop(index / (colors.length - 1), color);
            });
            ctx.fillStyle = gradient;
        } else {
            const barColor = Array.isArray(rankData.progressBar.bar?.color) 
                ? rankData.progressBar.bar?.color[0] 
                : rankData.progressBar.bar?.color;
            ctx.fillStyle = barColor || "#5865F2"; // Discord blue
        }

        if (rankData.progressBar.rounded) {
            // Rounded progress fill - modern look
            this.roundRect(
                ctx,
                rankData.progressBar.x || 0,
                rankData.progressBar.y || 0,
                progressWidth,
                rankData.progressBar.height || 0,
                (rankData.progressBar.height || 0) / 2
            );
        } else {
            // Regular progress fill
            ctx.rect(
                rankData.progressBar.x || 0,
                rankData.progressBar.y || 0,
                progressWidth,
                rankData.progressBar.height || 0
            );
        }
        ctx.fill();

        // Draw XP text with smaller, cleaner font
        ctx.font = "bold 16px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = rankData.currentXP.color || "#A3A6AA";
        ctx.fillText(
            `XP: ${rankData.currentXP.data || 0} / ${rankData.requiredXP.data || 0}`,
            rankData.progressBar.x || 0,
            (rankData.progressBar.y || 0) + (rankData.progressBar.height || 0) + 20
        );

        // Add percentage display on the right side
        ctx.textAlign = "right";
        ctx.fillText(
            `${Math.round(progress * 100)}%`,
            (rankData.progressBar.x || 0) + (rankData.progressBar.width || 0),
            (rankData.progressBar.y || 0) + (rankData.progressBar.height || 0) + 20
        );

        return canvas.toBuffer("image/png");
    }

    /**
     * Utility function to draw rounded rectangles
     * @private
     */
    private roundRect(
        ctx: SKRSContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
    ): void {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    }

    /**
     * Get default color based on status type
     * @private
     */
    private getStatusColor(statusType?: StatusType | string): string {
        switch (statusType) {
            case StatusType.ONLINE:
            case "online":
                return "#43b581";
            case StatusType.DND:
            case "dnd":
                return "#f04747";
            case StatusType.IDLE:
            case "idle":
                return "#faa61a";
            case StatusType.STREAMING:
            case "streaming":
                return "#6441a5";
            case StatusType.OFFLINE:
            case "offline":
                return "#747f8d";
            default:
                return "#43b581"; // Default to online
        }
    }
}