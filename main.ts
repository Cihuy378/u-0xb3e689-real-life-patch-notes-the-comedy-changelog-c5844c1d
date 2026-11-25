// Entry for "Real-Life Patch Notes: The Comedy Changelog" (make.fun).
// Copies the repo's entry.txt to /output/entry.txt byte-for-byte — no
// reformatting, no added newline, no reinterpretation — then reads the
// copy back, so the text the grader judges is exactly the entry.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const source = new URL("./entry.txt", import.meta.url);
const outDir = "/output";
const outPath = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
copyFileSync(source, outPath);

const expected = readFileSync(source);
const actual = readFileSync(outPath);
if (!expected.equals(actual)) {
  throw new Error(
    `verification failed: refusing a corrupted copy — /output/entry.txt is ${actual.length} bytes but entry.txt is ${expected.length} bytes`,
  );
}
console.log(`wrote ${actual.length} bytes to /output/entry.txt`);
