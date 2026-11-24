// Fortune in a Pot — a one-line fortune for a houseplant.
//
// The program does exactly one thing: it writes a single kind, funny
// fortune (told to the plant on the windowsill, about the plant's own
// future) to entry.txt inside the output directory, then reads the file
// back and refuses to finish if the text falls outside the competition
// gate of 1 to 120 characters.
//
// The fortune is composed from three beats rather than stored as one
// frozen string, so each beat can be tuned on its own:
//
//   lean       — what the plant is about to do (chase the light, as always)
//   turning    — what its keeper does in response (the classic pot turn)
//   punchline  — how the plant chooses to see it (a holiday, obviously)
//
// Node 22, standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface FortuneParts {
  lean: string;
  turning: string;
  punchline: string;
}

// Every windowsill plant knows this story: it leans toward the sun until
// its keeper rotates the pot to straighten it out — and from the plant's
// side of the glass, that half-turn is the trip of a lifetime, well worth
// bragging about to the fern next door.
const PARTS: FortuneParts = {
  lean: "You will lean so far toward the sun",
  turning: "that your keeper turns your pot",
  punchline: "and you will brag to the fern about your holiday.",
};

function composeFortune(parts: FortuneParts): string {
  return `${parts.lean} ${parts.turning}, ${parts.punchline}`;
}

// The gate from the competition kit: UTF-8 text, 1..120 characters,
// not only whitespace.
const MAX_CHARS = 120;

function outputDir(): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; /output is the sandbox default.
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function checkGate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${text.length} characters; the gate allows 1 to ${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("fortune is only whitespace; the gate rejects that");
  }
  if (text.includes("\n")) {
    throw new Error("fortune must be a single line");
  }
}

function main(): void {
  const fortune = composeFortune(PARTS);
  checkGate(fortune); // fail before writing a line the gate would refuse

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  const file = join(dir, "entry.txt");
  writeFileSync(file, fortune, "utf8");

  // Read it back and hold the written bytes to the gate, so a bad edit
  // fails loudly here instead of scoring zero with the judge.
  const written = readFileSync(file, "utf8");
  checkGate(written);

  console.log(`wrote ${written.length} characters to ${file}`);
}

main();
