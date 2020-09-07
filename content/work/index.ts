import { getUnixTime } from "date-fns";
import { Event } from "utils/event";
import { makeID } from "utils/id";
import { OLC } from "utils/location";
import * as skill from "../skill";
import * as Google from "./google";
import * as Grapeshot from "./grapeshot";
import * as IBM from "./ibm";

export interface Work extends Event {
  company: string;
  location: OLC;

  role: string;
  skills: Set<skill.SkillNames>;
  summary: string[];
}

export function id(work: Work): string {
  return makeID(work.company + getUnixTime(work.interval.start));
}

export const data = { ...IBM, ...Grapeshot, ...Google };
