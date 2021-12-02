import { Handler } from "../handler.ts";

const dive = (instructions: string[], useAim: boolean) => {
  const pos = instructions
    .reduce((acc, i) => {
      let { vertical, horizontal, aim } = acc;
      const [dir, n] = i.split(" ");
      switch (dir) {
        case "up":
          aim -= Number(n);
          break;
        case "down":
          aim += Number(n);
          break;
        case "forward":
          horizontal += Number(n);
          if (useAim) {
            vertical += Number(n) * aim;
          }
          break;
      }
      return { vertical, horizontal, aim };
    }, { vertical: 0, horizontal: 0, aim: 0 });

  return pos.horizontal * (pos.vertical || pos.aim);
};

export const day02: Handler = (lines, part) => {
  const instructions = lines.filter((l) => l !== "");

  return dive(instructions, part === 2);
};
