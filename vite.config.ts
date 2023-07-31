import {defineConfig} from "vite";
// @ts-ignore
import packageJson from "./package.json";
import * as path from "path";
import dts from 'vite-plugin-dts'
import copyFiles from './copy-files-plugin'

const getPackageNameCamelCase = () => {
  try {
    return packageJson.name.replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

module.exports = defineConfig({
  base: "./",
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ['src/index.ts', 'src/bs-popover.ts'],
      name: getPackageNameCamelCase(),
      fileName: (format, entryName) => {
        return (format === "es" ? `${entryName}.js` : `${entryName}.umd.js`)
      },
    },
    rollupOptions: {
      input: {
        'index': path.resolve(__dirname, 'src/index.ts'),
        'bs-popover': path.resolve(__dirname, 'src/bs-popover.ts'),
      }
      },
  },
  plugins: [
    dts({
      outDir: ['dist'],
    }),
    copyFiles({
      files: [
        { src: 'src/style.css', dest: 'dist/style.css' },
        { src: 'src/bs-popover/style.css', dest: 'dist/bs-popover/style.css' },
      ],
    }),
  ]
});
