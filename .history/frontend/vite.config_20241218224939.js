import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  optimizeDeps: {
    exclude: ["mongoose"], // Exclude 'mongoose' from dependency optimization
  },
  ssr: {
    external: ["mongoose"], // Prevent 'mongoose' from being bundled in SSR
  },
});
