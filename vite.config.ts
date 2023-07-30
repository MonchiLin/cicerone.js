import {defineConfig} from "vite";
// @ts-ignore
import packageJson from "./package.json";
import * as path from "path";
import dts from 'vite-plugin-dts'

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
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.source) {
            return assetInfo.name!;
          }
          if (assetInfo.name === "style.css") {
            return 'style.css';
          }
          if ((assetInfo.source as string).includes('.bs-popover')) {
            return 'bs-popover/bs-popover.css';
          }
          return assetInfo.name!;
        },
      }
    },
  },
  plugins: [
    dts({
      outDir: ['dist'],
    })
  ]
});
