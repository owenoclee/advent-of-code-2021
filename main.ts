import { readAll } from "https://deno.land/std@0.116.0/streams/conversion.ts";

import { days } from "./days.ts";

const usage = `Usage: deno run main.ts day part

Puzzle input is expected via stdin.`;

const [sDay, sPart] = Deno.args;
const day = /^[0-9]+$/.test(sDay) ? Number(sDay) : null;
const part = sPart === "1" ? 1 : sPart === "2" ? 2 : null;

if (Deno.args.length != 2 || !day || !part) {
  console.log(usage);
  Deno.exit(1);
}

const lines = new TextDecoder()
  .decode(await readAll(Deno.stdin))
  .split("\n");

const dayHandler = days[day-1];

if (!dayHandler) {
  console.log(`Day ${day} not implemented`);
  Deno.exit(1);
}

console.log(dayHandler(lines, part));
