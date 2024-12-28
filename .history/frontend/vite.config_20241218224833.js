import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  optimizeDeps: {
    exclude: ["mongoose"], // Exclude mongoose from optimization
  },
  ssr: {
    external: ["mongoose"], // Avoid bundling mongoose in SSR
  },
});
