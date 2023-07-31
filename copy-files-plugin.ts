import * as path from "path";
import * as fs from "fs";

type CopyFilesPluginOptions = {
  files: {
    src: string;
    dest: string;
  }[]
}

export default function copyFilesPlugin(options: CopyFilesPluginOptions) {
  return {
    name: 'copy-files-plugin',
    generateBundle() {
      if (!options || !options.files || !Array.isArray(options.files)) {
        console.error('Invalid options for copy-files-plugin.');
        return;
      }

      options.files.forEach(({src, dest}) => {
        if (!src || !dest) {
          console.error('Invalid file configuration for copy-files-plugin.');
          return;
        }

        const srcPath = path.resolve(src);
        const destPath = path.resolve(dest);

        // Create directory if it doesn't exist
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, {recursive: true});
        }

        fs.copyFileSync(srcPath, destPath);
        console.log(`\nFile copied: ${srcPath} -> ${destPath}`);
      });
    },
  };
}
