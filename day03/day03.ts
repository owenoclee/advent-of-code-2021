import { Handler } from "../handler.ts";

const filterByBitCriteria = (binaryNumbers: string[], mostCommon: boolean) => {
  let filteredBinaryNumbers = [...binaryNumbers];
  for (let col = 0; col < filteredBinaryNumbers[0].length; col++) {
    const bitRowMap: string[][] = [[], []];
    for (let row = 0; row < filteredBinaryNumbers.length; row++) {
      const bit = filteredBinaryNumbers[row][col] === "0" ? 0 : 1;
      bitRowMap[bit].push(filteredBinaryNumbers[row]);
    }
    const mostCommonBit = bitRowMap[1].length >= bitRowMap[0].length ? 1 : 0;
    const bit = mostCommon ? mostCommonBit : mostCommonBit ? 0 : 1;
    filteredBinaryNumbers = [...bitRowMap[bit]];
    if (filteredBinaryNumbers.length < 2) {
      break;
    }
  }
  return filteredBinaryNumbers[0];
}

const mostCommonBit = (binaryColumn: string) =>
  [...binaryColumn].reduce(
      (acc, bit) => acc += bit === "0" ? -1 : 1,
      Number(0),
    ) >= 0
    ? 1
    : 0;

const mostCommonBits = (binaryRows: string[]) =>
  binaryRows
    .reduce((binaryCols, n) => {
      const cols = [...binaryCols];
      for (let i = 0; i < n.length; i++) {
        cols[i] += n[i];
      }
      return cols;
    }, new Array(binaryRows[0].length).fill("") as string[])
    .map((binaryCol) => mostCommonBit(binaryCol));

export const day03: Handler = (lines, part) => {
  const binaryNumbers = lines.filter((l) => l !== "");

  if (part === 1) {
    const gammaBinary = mostCommonBits(binaryNumbers);
    const epsilonBinary = gammaBinary.map((bit) => bit ? 0 : 1);

    const gamma = parseInt(gammaBinary.join(""), 2);
    const epsilon = parseInt(epsilonBinary.join(""), 2);

    return gamma * epsilon;
  }

  const oxygenGeneratorRatingBinary = filterByBitCriteria(binaryNumbers, true);
  const co2ScrubberRatingBinary = filterByBitCriteria(binaryNumbers, false);

  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
  const co2ScrubberRating = parseInt(co2ScrubberRatingBinary, 2);

  return oxygenGeneratorRating * co2ScrubberRating;
};
