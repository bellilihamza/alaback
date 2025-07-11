import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  // Only add lovable-tagger in development mode and when available
  if (mode === 'development') {
    try {
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch (error) {
      console.warn('lovable-tagger not available, skipping...');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: true, // Affiche les erreurs en overlay
      },
      watch: {
        usePolling: true, // Force le polling pour certains systèmes
        interval: 100, // Intervalle de vérification (ms)
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query'],
            i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
            api: ['axios'],
          },
        },
        onwarn(warning, warn) {
          // Suppress warnings about external modules
          if (warning.code === 'UNRESOLVED_IMPORT') {
            return;
          }
          warn(warning);
        },
      },
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false,
    },
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'i18next',
        'react-i18next',
        'i18next-browser-languagedetector',
        'axios',
      ],
    },
  };
});
