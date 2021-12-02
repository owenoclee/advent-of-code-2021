import { Handler } from "../handler.ts";

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

export const day01: Handler = (lines, part) => {
  const readings = lines
    .filter((l) => l !== "")
    .map((l) => Number(l));

  const window = part === 1 ? 1 : 3;

  return sonarSweep(readings, window);
};
