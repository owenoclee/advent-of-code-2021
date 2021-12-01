import { readLines } from "https://deno.land/std@0.116.0/io/buffer.ts";

let increases = 0;
let prevN: number | undefined;

for await (const l of readLines(Deno.stdin)) {
  const n = Number(l);
  if (prevN && n > prevN) {
    increases++;
  }
  prevN = n;
}

console.log(increases);
