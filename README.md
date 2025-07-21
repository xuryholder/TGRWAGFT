# TGRWAGFT - Telegram Gift Store Web App

## Project Description

**TGRWAGFT** is a modern Telegram Mini App for orgering physical NFT gifts with. The application is integrated with TON Connect for crypto payments and supports interactive 3D gift models for visual UI.

## Key Features

- 🎁 **Gift Catalog** - collection of digital gifts with 3D models
- 🎨 **3D Visualization** - interactive 3D gift models with swipe support
- 💰 **TON Connect Integration** - secure crypto payments via TON blockchain
- 📱 **Telegram Web App** - native Telegram integration
- 🛒 **Order System** - complete purchase cycle from selection to payment (mok)
- 🎯 **Responsive Design** - optimized for mobile devices

## Technology Stack

### Frontend
- **React 19** - modern UI framework
- **TypeScript** - typed JavaScript
- **Vite** - fast project bundler
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React integration with Three.js
- **@react-three/drei** - useful components for Three.js

### Blockchain & Payments
- **TON Connect** - TON blockchain integration
- **@tonconnect/ui-react** - React components for TON Connect

### Deployment
- **Docker** - application containerization
- **Fly.io** - cloud deployment
- **Node.js 20** - server environment

## Project Structure

```
TGRWAGFT/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/
│   ├── 3d/              # 3D gift models (.glb files)
│   │   ├── Purple_Heart_Buddy_0704043729_texture.glb
│   │   ├── Purple_Heart_Buddy_0704043432_texture.glb
│   │   ├── Purple_Heart_Buddy_0704043415_texture.glb
│   │   └── Purple_Heart_Buddy_0704043357_texture.glb
│   └── img/             # Gift images
│       ├── pepe.png
│       ├── bunny.png
│       ├── frog.png
│       ├── pack.png
│       └── pepe figure.png
├── Dockerfile           # Docker configuration
├── fly.toml            # Fly.io configuration
├── tonconnect-manifest.json  # TON Connect manifest
├── telegramlogo.svg    # Telegram logo
└── package.json        # Project dependencies
```

## Quick Start

### Local Development

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd TGRWAGFT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
npm run build
```

### Run Production Version

```bash
npm run preview
```

## Docker Deployment

### Build Image
```bash
docker build -t tgrwagft .
```

### Run Container
```bash
docker run -p 8080:8080 tgrwagft
```

## Fly.io Deployment

The project is configured for automatic deployment on Fly.io:

- **App**: `tgrwagft`
- **Region**: `sin` (Singapore)
- **Port**: 8080
- **Memory**: 1024MB
- **CPU**: 1 shared core

### Deploy
```bash
fly deploy
```

## Main Application Pages

### 1. Home Page (Hero)
- Welcome screen
- Brief functionality description
- Shop transition button

### 2. Shop Page
- Popular gifts catalog
- New arrivals
- Gift collections
- Categories: Memes, NFTs, Plush

### 3. Gift Carousel (Gifts)
- Interactive 3D gift models
- Swipe support for switching
- Information about each gift (ID, rarity, faction)
- "MINT" button for purchase

### 4. Order Page
- Detailed gift information
- Price in TON and USD
- Product specifications
- Payment button via TON Connect

### 5. Profile Page
- User information
- TON wallet connection
- Gift statistics
- Application settings

## 3D Models

The application includes 4 unique 3D gift models:
- **Purple Heart Buddy** - series of 4 variants
- Format: GLB (GL Binary)
- Size: 8.4-9.8MB each
- High-quality textured models

## TON Connect Integration

### Configuration
- **Manifest**: `tonconnect-manifest.json`
- **URL**: `https://tgrwagft.fly.dev`
- **Icon**: `telegramlogo.svg`

### Functionality
- TON wallet connection
- Secure crypto payments
- Support for various TON wallets

## Telegram Mini App Integration

### Initialization
```typescript
useEffect(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
}, []);
```

### Features
- Native Telegram integration
- Responsive design for mobile devices
- Gesture and swipe support

## Key Components

### GiftCarousel
- Interactive 3D model carousel
- Swipe support on mobile devices
- Information about gift rarity and faction

### OrderPage
- Detailed order page
- TON Connect integration for payments
- Successful purchase modal

### TonConnectButton
- TON wallet connection component
- Integration in user profile

## Scripts

```json
{
  "dev": "vite",           // Run in development mode
  "build": "vite build",   // Build for production
  "preview": "vite preview", // Preview build
  "start": "serve -s dist -l 8080" // Run production version
}
```

## License

The project is distributed under the license specified in the `LICENSE` file.

## Demo

The application is available at: [https://t.me/tgrwagft_bot](https://t.me/tgrwagft_bot)

---

**TGRWAGFT** - a modern solution for sending digital physical gifts via Telegram with support of crypto payments. 