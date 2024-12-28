import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["mongoose"], // Exclude mongoose from optimization
  },
  ssr: {
    external: ["mongoose"], // Avoid bundling mongoose in SSR
  },
});
