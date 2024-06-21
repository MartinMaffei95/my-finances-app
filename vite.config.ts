import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'


const pwaConfig:Partial<VitePWAOptions> ={
  strategies: 'generateSW',
  // when using strategies 'injectManifest' you need to provide the srcDir
  // srcDir: 'src',
  // when using strategies 'injectManifest' use claims-sw.ts or prompt-sw.ts
  // filename: 'prompt-sw.ts',
  registerType: 'prompt',
  injectRegister: false,
  pwaAssets: { disabled: false, config: true, htmlPreset: '2023', overrideManifestIcons: true },
  manifest: {
    name: 'My finances',
    short_name: 'My finances',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'  
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
  injectManifest: {
    globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
  },
  devOptions: {
    enabled: true,
    navigateFallback: 'index.html',
    suppressWarnings: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
  },
}


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  resolve: {
    alias: {
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.js"),
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    react(),
    VitePWA(pwaConfig)
  ],

})


