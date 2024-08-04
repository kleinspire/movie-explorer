/// <reference types="vitest" />
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "istanbul", // or 'v8'
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.jsx", "src/**/*.tsx"],
      exclude: [
        "docs/**",
        "node_modules/**",
        "src/**/*.test.{js,ts,jsx,tsx}", // Exclude test files
        "src/**/*.spec.{js,ts,jsx,tsx}", // Exclude spec files
        "src/main.tsx",
      ],
    },
  },
});
