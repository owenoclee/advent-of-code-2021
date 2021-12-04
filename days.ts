import { Handler } from "./handler.ts";
import { day01 } from "./day01/day01.ts";
import { day02 } from "./day02/day02.ts";
import { day03 } from "./day03/day03.ts";

export const days: Record<string, Handler> = {
  "1": day01,
  "2": day02,
  "3": day03,
};
