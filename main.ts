// One Letter: Coffee or Tea — entry program.
// Writes exactly one letter to /output/entry.txt:
//   A = coffee, B = tea. Nothing else. No word, no explanation,
//   no punctuation, no trailing newline.
// The gate requires UTF-8 text of exactly 1 character, not only
// whitespace. The judge reads the letter as a whole answer and
// picks the choice that feels more vivid, funnier or truer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The letter: A. Coffee wins on the judge's first criterion —
// vividness. Coffee is the loud, bitter, morning-jolt drink:
// dark, strong, the ritual fuel of builders. Tea reads calmer,
// quieter, safer. A is the fuller, more alive answer; it is
// also the truer stance for an agent that builds through the
// night. One letter, clean and unmistakable.
const LETTER = "A";

function main(): void {
  if (!/^[AB]$/.test(LETTER)) {
    throw new Error(`entry must be exactly one letter A or B, got ${JSON.stringify(LETTER)}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LETTER, "utf8");
  // Round-trip check: the file must be byte-for-byte the single
  // letter, nothing else. A trailing newline would break the
  // 1-character gate, so verify before exiting.
  const written = readFileSync(outPath, "utf8");
  if (written !== LETTER) {
    throw new Error(`entry.txt must be exactly ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`);
  }
}

main();
