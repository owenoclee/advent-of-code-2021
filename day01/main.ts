import { readAll } from "https://deno.land/std@0.116.0/streams/conversion.ts";

const sonarSweep = (readings: number[], window: number) => {
  let increases = 0;
  let prev: number | undefined;

  for (let i = 0; i < readings.length - (window - 1); i++) {
    let sum = 0;
    for (let wi = 0; wi < window; wi++) {
      sum += readings[i + wi];
    }
    if (prev !== undefined && sum > prev) {
      increases++;
    }
    prev = sum;
  }

  return increases;
};

const part = Deno.args[0];
if (Deno.args.length != 1 || !/^(1|2)$/.test(part)) {
  console.log("Part must be supplied (1 or 2)");
  Deno.exit(1);
}

const readings = new TextDecoder()
  .decode(await readAll(Deno.stdin))
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => Number(l));

const window = part === "1" ? 1 : 3;

console.log(sonarSweep(readings, window));
