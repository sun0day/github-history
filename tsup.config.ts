import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/history.js",
    "src/history-background.js",
    "src/history-popup.js",
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  treeshake: true,
  minify: true,
  format: ["esm"],
  bundle: true,
  noExternal: ["lodash.uniqby"],
});
