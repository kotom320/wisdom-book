import subsetFont from "subset-font";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SOURCE_URL =
  "https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/KR/NotoSerifKR-Medium.otf";
const CACHE_DIR = resolve(root, ".fonts-cache");
const CACHE_PATH = resolve(CACHE_DIR, "NotoSerifKR-Medium.otf");
const OUT_PATH = resolve(root, "src/app/_og/NotoSerifKR-Subset.otf");

const texts = [
  "지혜의 서",
  "고전의 지혜를 현대의 언어로",
  "매일 한 구절 마음에 담아",
  "오늘의 구절",
  "풀어 읽으면",
  "오늘의 당신에게",
];

const uniqueChars = [...new Set(texts.join(""))].join("");

if (!existsSync(CACHE_PATH)) {
  console.log("Downloading Noto Serif KR...");
  mkdirSync(CACHE_DIR, { recursive: true });
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(CACHE_PATH, buf);
  console.log(`Cached: ${(buf.length / 1024 / 1024).toFixed(1)} MB`);
}

const input = readFileSync(CACHE_PATH);
const output = await subsetFont(input, uniqueChars, { targetFormat: "sfnt" });

writeFileSync(OUT_PATH, output);

console.log(
  `Subset: ${uniqueChars.length} chars → ${(output.length / 1024).toFixed(1)} KB`
);
console.log(`Output: ${OUT_PATH}`);
