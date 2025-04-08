import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const isStorybookBuild = process.env.STORYBOOK_BUILD === "true";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  resolve: {
    alias: {
      "sims-ui": `${resolve(__dirname, "./lib/main.ts")}`,
    },
  },
  build: {
    copyPublicDir: false,

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
