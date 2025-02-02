import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  test: {
    root: "test",
    setupFiles: ["../test/testing.ts"],
    passWithNoTests: true,
    forceRerunTriggers: ["**"],
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
  },
});
