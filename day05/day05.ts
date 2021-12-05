import { Handler } from "../handler.ts";

type Coordinate = {
  x: number;
  y: number;
};

type CoordinatePair = {
  start: Coordinate;
  end: Coordinate;
};

const ctos = (c: Coordinate) => `${c.x},${c.y}`;

export const parseInputLines = (lines: string[]) =>
  lines
    .filter((l) => l !== "")
    .map((l) => {
      const [, x1, y1, x2, y2] = l.match(/^(\d+),(\d+) -> (\d+),(\d+)$/)!;
      return {
        start: { x: Number(x1), y: Number(y1) },
        end: { x: Number(x2), y: Number(y2) },
      };
    });

export const filterStraightPairs = (coordinatePairs: CoordinatePair[]) =>
  coordinatePairs
    .filter((p) => p.start.x === p.end.x || p.start.y === p.end.y);

export const filterPerfectDiagonalPairs = (coordinatePairs: CoordinatePair[]) =>
  coordinatePairs
    .filter((p) =>
      p.start.x !== p.end.x &&
      p.start.y !== p.end.y &&
      Math.abs(p.start.x - p.end.x) === Math.abs(p.start.y - p.end.y)
    );

export const pointsOnLine = function* (pair: CoordinatePair) {
  const diff = { x: pair.end.x - pair.start.x, y: pair.end.y - pair.start.y };

  if (diff.x === 0 && diff.y === 0) {
    yield { x: pair.start.x, y: pair.start.y };
    return;
  }

  const shift = { ...diff };
  if (diff.x !== 0) {
    shift.x = diff.x / Math.abs(diff.x);
  }
  if (diff.y !== 0) {
    shift.y = diff.y / Math.abs(diff.y);
  }
  for (
    let { x, y } = pair.start;
    Math.abs(pair.end.x - x) > 0 || Math.abs(pair.end.y - y) > 0;
    x += shift.x, y += shift.y
  ) {
    yield { x, y };
  }
  yield { x: pair.end.x, y: pair.end.y };
};

export const day05: Handler = (lines, part) => {
  const coordinatePairs = parseInputLines(lines);

  const straightPairs = filterStraightPairs(coordinatePairs);
  const diagonalPairs = filterPerfectDiagonalPairs(coordinatePairs);
  const pairsForPart = [...straightPairs, ...(part === 2 ? diagonalPairs : [])];

  const pointFrequencyMap: Record<string, number> = {};
  for (const pair of pairsForPart) {
    for (const point of pointsOnLine(pair)) {
      const frequencyOfThisPoint = pointFrequencyMap[ctos(point)] || 0;
      pointFrequencyMap[ctos(point)] = frequencyOfThisPoint + 1;
    }
  }

  const overlappingPoints = Object.values(pointFrequencyMap)
    .filter((frequency) => frequency > 1)
    .length;

  return overlappingPoints;
};
