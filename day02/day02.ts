import { Handler } from "../handler.ts";

const dive = (instructions: string[]) => {
  const depth = instructions
    .filter((i) => ["u", "d"].includes(i[0]))
    .reduce((acc, i) => {
      const [dir, n] = i.split(" ");
      if (dir[0] === "u") {
        return acc - Number(n);
      }
      return acc + Number(n);
    }, 0)
  
  const horizontalPos = instructions
    .filter((i) => i[0] === "f")
    .reduce((acc, i) => {
      const n = i[i.length-1];
      return acc + Number(n);
    }, 0)
  
  return depth * horizontalPos;
};

export const day02: Handler = (lines, part) => {
  const instructions = lines.filter((l) => l !== "");

  return dive(instructions);
};
