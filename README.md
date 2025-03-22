<div align="center">
  <h1>🎑 kiutils</h1>
  <p>A powerful JavaScript/TypeScript utility library for image manipulation, Discord utilities, and more!</p>
  
  [![npm version](https://img.shields.io/npm/v/kiutils.svg?style=flat-square)](https://www.npmjs.org/package/kiutils)
  [![install size](https://packagephobia.com/badge?p=kiutils)](https://packagephobia.com/result?p=kiutils)
  [![npm downloads](https://img.shields.io/npm/dm/kiutils.svg?style=flat-square)](http://npm-stat.com/charts.html?package=kiutils)
  [![License](https://img.shields.io/github/license/YoruAkio/kiutils)](https://github.com/YoruAkio/kiutils/blob/main/LICENSE)
</div>

## ✨ Features

- 🖼️ **Image Manipulation** - Convert, resize, and create thumbnails with ease
- 🤖 **Discord Utilities** - Create beautiful rank cards and other Discord-related graphics
- 📝 **Code Sharing** - Share code snippets via SourceBin
- 🌸 **Anime Images** - Fetch waifu images with a simple API
- 🧰 **Utility Functions** - Various helper functions for common tasks

## 📦 Installation

```bash
# Using npm
npm install kiutils

# Using yarn
yarn add kiutils

# Using pnpm
pnpm add kiutils
```

## 🚀 Quick Start

```typescript
// Import the modules you need
const { Canvas, Discord, waifu, convertImage, ImageFormat } = require('kiutils');
// OR with ES modules
import { Canvas, Discord, waifu, convertImage, ImageFormat } from 'kiutils';
```

## 📚 Usage Examples

### Image Conversion

```typescript
import { convertImage, ImageFormat } from 'kiutils';
import * as fs from 'fs';

// Convert an image to WebP format
const convertToWebP = async () => {
  const buffer = await convertImage('input.jpg', ImageFormat.WEBP, {
    quality: 80,
    width: 800
  });
  
  fs.writeFileSync('output.webp', buffer);
  console.log('Image converted successfully!');
};

convertToWebP();
```

### Creating Discord Rank Cards

```typescript
import { Discord } from 'kiutils';
import * as fs from 'fs';

const createRankCard = async () => {
  const rankCard = await new Discord().createRankCard({
    username: { name: 'CoolUser#1234' },
    level: { data: 15, display: true },
    rank: { data: 12, display: true },
    currentXP: { data: 500 },
    requiredXP: { data: 1000 },
    avatar: { source: 'https://i.imgur.com/example.png' },
    status: { type: 'online' },
    progressBar: {
      bar: {
        type: 'gradient',
        color: ['#5865F2', '#EB459E']
      }
    }
  });
  
  fs.writeFileSync('rank-card.png', rankCard);
  console.log('Rank card created!');
};

createRankCard();
```

### Fetching Waifu Images

```typescript
import { waifu, WaifuType } from 'kiutils';

const getWaifuImage = async () => {
  const imageUrl = await waifu(WaifuType.SFW);
  console.log(`Waifu image URL: ${imageUrl}`);
};

getWaifuImage();
```

### Simple Canvas Creation

```typescript
import { Canvas } from 'kiutils';
import * as fs from 'fs';

const createCanvas = async () => {
  const canvas = new Canvas({
    width: 800,
    height: 400,
    background: {
      color: '#5865F2',
      image: 'color'
    },
    fontColor: '#FFFFFF'
  });
  
  const buffer = await canvas.renderWithText('Hello World!', {
    font: '40px Arial',
    align: 'center'
  });
  
  fs.writeFileSync('canvas.png', buffer);
  console.log('Canvas created!');
};

createCanvas();
```

### Sharing Code on SourceBin

```typescript
import { bin } from 'kiutils';

const shareCode = async () => {
  const code = `
function helloWorld() {
  console.log('Hello from kiutils!');
}

helloWorld();
  `;
  
  const url = await bin(code);
  console.log(`Code shared at: ${url}`);
};

shareCode();
```

## 📋 API Documentation

For complete API documentation, please visit our [documentation website](https://github.com/YoruAkio/kiutils#readme).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check the [issues page](https://github.com/YoruAkio/kiutils/issues).

## 📝 License

This project is [MIT](https://github.com/YoruAkio/kiutils/blob/main/LICENSE) licensed.
