import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function convert(input, output, width, quality) {
  const inputSize = (await stat(input)).size;
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);
  const outputSize = (await stat(output)).size;
  console.log(
    `${path.relative(root, input)}: ${formatBytes(inputSize)} -> ${path.relative(
      root,
      output,
    )}: ${formatBytes(outputSize)}`,
  );
}

await convert(
  path.join(publicDir, "images", "dikesh-hero.png"),
  path.join(publicDir, "images", "dikesh-hero.webp"),
  1200,
  82,
);
await convert(
  path.join(publicDir, "images", "dikesh-hero-navy.png"),
  path.join(publicDir, "images", "dikesh-hero-navy.webp"),
  1200,
  82,
);
await convert(
  path.join(publicDir, "images", "dikesh-avatar.jpg"),
  path.join(publicDir, "images", "dikesh-avatar.webp"),
  800,
  82,
);

const projectDir = path.join(publicDir, "projects");
const projectFiles = (await readdir(projectDir))
  .filter((file) => file.toLowerCase().endsWith(".png"))
  .sort();

for (const file of projectFiles) {
  const input = path.join(projectDir, file);
  const output = path.join(projectDir, `${path.basename(file, ".png")}.webp`);
  await convert(input, output, 1400, 80);
}
