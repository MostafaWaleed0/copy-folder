import * as fs from "node:fs";
import * as path from "node:path";

async function createDistFolder(dist: fs.PathLike) {
  await (fs.existsSync(dist) ? null : fs.mkdirSync(dist, { recursive: true }));
}

async function copyFolder(src: string, dist: string) {
  const files = fs.readdirSync(src);
  await createDistFolder(dist);

  for (const file of files) {
    const srcFiles = path.join(src, file);
    const distFiles = path.join(dist, file);
    const stats = fs.lstatSync(srcFiles);

    if (stats.isDirectory()) {
      await copyFolder(srcFiles, distFiles);
    } else {
      await fs.copyFileSync(srcFiles, distFiles);
    }
  }
}

const srcDir = path.join(process.cwd(), "src/content");
const distDir = path.join(process.cwd(), "posts");

copyFolder(srcDir, distDir);
