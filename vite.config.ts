import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    react({ include: "**/*.tsx" }),
  ],
  build: {
    manifest: true,
    minify: true,
    ssrManifest: true,
  },
});
