import { Handler } from "../handler.ts";

export const parseInputLines = (lines: string[]) =>
  lines
    .find((l) => /\d+/.test(l))!
    .split(",")
    .map((n) => Number(n));

export const countByAge = (ages: number[]) =>
  ages
    .reduce((counts, n) => {
      const nextCounts = [...counts];
      nextCounts[n]++;
      return nextCounts;
    }, new Array(9).fill(0) as number[]);

export const shiftCounts = (counts: number[]) => {
  const originalCounts = [...counts];
  const shiftedCounts = [];
  for (let i = 0; i < counts.length; i++) {
    shiftedCounts[i] = originalCounts[(i + 1) % counts.length];
  }
  return shiftedCounts;
};

export const sumOfFishCounts = (counts: number[]) =>
  counts.reduce((sum, c) => sum + c);

export const agesListFromCounts = (counts: number[]) => {
  const ages: number[] = [];
  for (let age = 0; age < counts.length; age++) {
    const count = counts[age];
    for (let i = 0; i < count; i++) {
      ages.push(age);
    }
  }
  return ages;
};

export const simulateDayByCounts = (counts: number[]) => {
  const nextCounts = shiftCounts(counts);
  nextCounts[6] += nextCounts[8];
  return nextCounts;
};

export const day06: Handler = (lines, part) => {
  const ages = parseInputLines(lines);
  const daysToSimulate = part === 1 ? 80 : 256;

  let counts = countByAge(ages);
  for (let i = 0; i < daysToSimulate; i++) {
    counts = simulateDayByCounts(counts);
  }
  return sumOfFishCounts(counts);
};
