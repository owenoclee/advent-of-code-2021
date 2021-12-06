import { Handler } from "../handler.ts";

export const parseInputLines = (lines: string[]) =>
  lines[0].split(",").map((n) => Number(n));

export const countByAge = (ages: number[]) =>
  ages.reduce((counts, n) => {
    const nextCounts = [...counts];
    nextCounts[n]++;
    return nextCounts;
  }, new Array(9).fill(0) as number[]);

export const shiftAndWrapArray = (array: number[]) => {
  const shiftedArray = [];
  for (let i = 0; i < array.length; i++) {
    shiftedArray[i] = array[(i + 1) % array.length];
  }
  return shiftedArray;
};

export const sumOfFishCounts = (counts: number[]) =>
  counts.reduce((sum, c) => sum + c);

export const simulateDayByCounts = (counts: number[]) => {
  const nextCounts = shiftAndWrapArray(counts);
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
