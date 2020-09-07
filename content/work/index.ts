import { Event } from "utils/event";
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

export const data = { ...IBM, ...Grapeshot, ...Google };
