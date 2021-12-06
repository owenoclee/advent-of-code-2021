import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  countByAge,
  parseInputLines,
  shiftAndWrapArray,
  simulateDayByCounts,
  sumOfFishCounts,
} from "./day06.ts";

Deno.test("parseInputLines", () => {
  const lines = [
    "3,4,3,1,2",
    "",
  ];

  const ages = parseInputLines(lines);

  assertEquals(ages, [3, 4, 3, 1, 2]);
});

Deno.test("countsByAge", () => {
  const ages = [5, 4, 0, 1, 1, 5, 5, 6, 8, 2, 3, 5, 5, 3, 3, 4];

  const counts = countByAge(ages);

  assertEquals(counts, [1, 2, 1, 3, 2, 5, 1, 0, 1]);
});

Deno.test("shiftAndWrapArray", () => {
  const counts = [1, 2, 1, 3, 2, 5, 1, 0, 1];

  const shiftedCounts = shiftAndWrapArray(counts);

  assertEquals(shiftedCounts, [2, 1, 3, 2, 5, 1, 0, 1, 1]);
});

Deno.test("sumOfFishCounts", () => {
  const counts = [1, 2, 1, 3, 2, 5, 1, 0, 1];

  const sum = sumOfFishCounts(counts);

  assertEquals(sum, 1 + 2 + 1 + 3 + 2 + 5 + 1 + 0 + 1);
});

Deno.test("simulateDayByCounts", () => {
  const initialState = [0, 1, 1, 2, 1, 0, 0, 0, 0];

  const next1 = simulateDayByCounts(initialState);
  const next2 = simulateDayByCounts(next1);
  const next3 = simulateDayByCounts(next2);

  assertEquals(next1, [1, 1, 2, 1, 0, 0, 0, 0, 0]);
  assertEquals(next2, [1, 2, 1, 0, 0, 0, 1, 0, 1]);
  assertEquals(next3, [2, 1, 0, 0, 0, 1, 1, 1, 1]);
});
