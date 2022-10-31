import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/history.js", "src/history-background.js"],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  treeshake: true,
  format: ["esm"],
});
