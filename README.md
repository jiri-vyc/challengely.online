# Challengely — Minimalistic Challenge Tracker

## Tech Stack (React + TS + Tailwind v4 + Framer Motion)

Vite + React + TypeScript

Tailwind v4 (via @tailwindcss/postcss) + Autoprefixer

Uses `framer-motion`, `lucide-react`

### How to run
```
npm install
npm run dev
```

### How it was created 

#### 1) Create app
```
npm create vite@latest . -- --template react-ts
```

#### 2) Install deps
```
npm i framer-motion lucide-react
npm i -D @tailwindcss/postcss autoprefixer
```

#### 3) PostCSS (Tailwind v4)

postcss.config.js
```
export default {
    plugins: {
      "@tailwindcss/postcss": {},  // ✅ v4 plugin
      autoprefixer: {},
    },
  };
```

#### 4) Tailwind entry + theme tokens
src/index.css
```
@import "tailwindcss";

:root {
  --background: 0 0% 100%;   /* white */
  --foreground: 240 10% 10%; /* dark gray text */
}

/* Light by default */
html { color-scheme: light; }
body { color: hsl(var(--foreground)); background: hsl(var(--background)); }
```