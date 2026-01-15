# Farog Agency — Content Creator Agency Website

Modern, production-ready website for Farog Shaikh's content creator agency, built with Vite and styled with a midnight-green and cream theme.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The production build will be in the `dist/` folder, ready to deploy.

## 📁 Project Structure

```
farog-agency/
├── index.html          # Main HTML file
├── styles.css          # All styles (midnight-green & cream theme)
├── script.js           # JavaScript functionality
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
└── dist/               # Production build (generated)
```

## 🎨 Design System

- **Primary Color**: Midnight-green (#041c18, #062521, #08322c, #0b4139)
- **Background**: Black (#000000)
- **Text**: Cream (#fbf7ef, #f4eedf, #e8dec9)
- **Responsive**: Mobile-first, breakpoints at 720px and 980px

## 🛠️ Development

- **Dev Server**: `npm run dev` (with hot module replacement)
- **Build**: `npm run build` (optimized for production)
- **Preview**: `npm run preview` (test production build locally)

## 📦 Deployment

The `dist/` folder contains the optimized production build. Deploy it to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📝 Customization

- Colors: Edit CSS variables in `styles.css` (`:root`)
- Content: Update sections in `index.html`
- Functionality: Modify `script.js`
