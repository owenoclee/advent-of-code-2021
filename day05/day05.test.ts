import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  filterPerfectDiagonalPairs,
  filterStraightPairs,
  parseInputLines,
  pointsOnLine,
} from "./day05.ts";

Deno.test("parseInputLines", () => {
  const lines = [
    "",
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
    "",
  ];

  const parsed = parseInputLines(lines);

  assertEquals(parsed, [
    { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
    { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
    { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
    { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
    { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
    { start: { x: 6, y: 4 }, end: { x: 2, y: 0 } },
    { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
    { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
    { start: { x: 0, y: 0 }, end: { x: 8, y: 8 } },
    { start: { x: 5, y: 5 }, end: { x: 8, y: 2 } },
  ]);
});

Deno.test("filterStraightPairs", () => {
  const pairs = [
    { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
    { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
    { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
    { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
    { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
    { start: { x: 6, y: 4 }, end: { x: 2, y: 0 } },
    { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
    { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
    { start: { x: 0, y: 0 }, end: { x: 8, y: 8 } },
    { start: { x: 5, y: 5 }, end: { x: 8, y: 2 } },
  ];

  const straightPairs = filterStraightPairs(pairs);

  assertEquals(straightPairs, [
    { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
    { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
    { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
    { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
    { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
    { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
  ]);
});

Deno.test("filterPerfectDiagonalPairs", () => {
  const pairs = [
    // straights
    { start: { x: 1, y: 2 }, end: { x: 1, y: 5 } },
    { start: { x: 2, y: 2 }, end: { x: 2, y: 0 } },
    { start: { x: 4, y: 1 }, end: { x: 7, y: 1 } },
    { start: { x: 4, y: 3 }, end: { x: 1, y: 3 } },

    // imperfect diagonals
    { start: { x: 3, y: 5 }, end: { x: 5, y: 2 } },
    { start: { x: 0, y: 0 }, end: { x: 1, y: 2 } },
    { start: { x: 5, y: 0 }, end: { x: 4, y: 2 } },
    { start: { x: 5, y: 5 }, end: { x: 0, y: 3 } },

    // perfect diagonals
    { start: { x: 7, y: 7 }, end: { x: 9, y: 5 } },
    { start: { x: 0, y: 0 }, end: { x: 2, y: 2 } },
    { start: { x: 5, y: 6 }, end: { x: 2, y: 9 } },
    { start: { x: 4, y: 5 }, end: { x: 2, y: 3 } },
  ];

  const diagonalPairs = filterPerfectDiagonalPairs(pairs);

  assertEquals(diagonalPairs, [
    { start: { x: 7, y: 7 }, end: { x: 9, y: 5 } },
    { start: { x: 0, y: 0 }, end: { x: 2, y: 2 } },
    { start: { x: 5, y: 6 }, end: { x: 2, y: 9 } },
    { start: { x: 4, y: 5 }, end: { x: 2, y: 3 } },
  ]);
});

Deno.test("pointsOnLine - it works for straight lines", () => {
  assertEquals(
    Array.from(pointsOnLine({ start: { x: 1, y: 2 }, end: { x: 1, y: 5 } })),
    [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 2, y: 2 }, end: { x: 2, y: 0 } })),
    [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 4, y: 1 }, end: { x: 7, y: 1 } })),
    [
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 6, y: 1 },
      { x: 7, y: 1 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 4, y: 3 }, end: { x: 1, y: 3 } })),
    [
      { x: 4, y: 3 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ],
  );
});

Deno.test("pointsOnLine - it works for perfect diagonal lines", () => {
  assertEquals(
    Array.from(pointsOnLine({ start: { x: 7, y: 7 }, end: { x: 9, y: 5 } })),
    [
      { x: 7, y: 7 },
      { x: 8, y: 6 },
      { x: 9, y: 5 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 0, y: 0 }, end: { x: 2, y: 2 } })),
    [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 5, y: 6 }, end: { x: 2, y: 9 } })),
    [
      { x: 5, y: 6 },
      { x: 4, y: 7 },
      { x: 3, y: 8 },
      { x: 2, y: 9 },
    ],
  );

  assertEquals(
    Array.from(pointsOnLine({ start: { x: 4, y: 5 }, end: { x: 2, y: 3 } })),
    [
      { x: 4, y: 5 },
      { x: 3, y: 4 },
      { x: 2, y: 3 },
    ],
  );
});
