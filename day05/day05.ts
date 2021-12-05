import { Handler } from "../handler.ts";

type Coordinate = {
  x: number;
  y: number;
};

const pointsInLine = function*(start: Coordinate, end: Coordinate) {
  if (start.x < end.x) {
    for (let x = start.x; x <= end.x; x++) {
      yield { x, y: start.y };
    }
    return;
  }

  if (start.x > end.x) {
    for (let x = start.x; x >= end.x; x--) {
      yield { x, y: start.y };
    }
    return;
  }

  if (start.y < end.y) {
    for (let y = start.y; y <= end.y; y++) {
      yield { x: start.x, y };
    }
    return;
  }

  if (start.y > end.y) {
    for (let y = start.y; y >= end.y; y--) {
      yield { x: start.x, y };
    }
    return;
  }
};

const ctos = (c: Coordinate) => `${c.x},${c.y}`;

export const day05: Handler = (lines, part) => {
  const coordinatePairs = lines
    .filter((l) => l !== "")
    .map((l) => {
      const [, x1, y1, x2, y2] = l.match(/^(\d+),(\d+) -> (\d+),(\d+)$/)!;
      return {
        start: { x: Number(x1), y: Number(y1) },
        end: { x: Number(x2), y: Number(y2) },
      };
    });

  const straightLinedCoordinatePairs = coordinatePairs
    .filter((p) => p.start.x === p.end.x || p.start.y === p.end.y);

  const pointFrequencyMap: Record<string, number> = {};
  for (const coordPair of straightLinedCoordinatePairs) {
    for (const point of pointsInLine(coordPair.start, coordPair.end)) {
      const frequencyOfThisPoint = pointFrequencyMap[ctos(point)] || 0;
      pointFrequencyMap[ctos(point)] = frequencyOfThisPoint + 1;
    }
  }

  const overlappingPoints = Object.values(pointFrequencyMap)
    .filter((frequency) => frequency > 1)
    .length;

  return overlappingPoints;
};
