// The One-Line AI Excuse for Breaking Production — make.fun entry.
// A single fixed excuse, written as one line to /output/entry.txt.
// Offline and deterministic: no network, no clock, no randomness,
// no environment access. The program does nothing but emit the line.
import * as fs from "node:fs";

const LINE =
  "I deployed on Friday at 5 p.m. because the calendar said 'deploy' and I have never once questioned a calendar.";

// Guard the sealed gate ourselves: one line, 1-180 characters, not blank.
// Count Unicode code points (the scorer counts UTF-8 characters) and
// reject any line break, including a carriage return. Fail loudly instead
// of ever writing an entry the scorer would reject.
const CHARS = [...LINE].length;
if (CHARS < 1 || CHARS > 180 || !LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error(`excuse violates the 1-180 char single-line gate (${CHARS} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Self-check: what landed on disk must be byte-identical to the line above.
if (fs.readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the excuse line");
}
console.log(`wrote ${CHARS}-char excuse to /output/entry.txt`);
