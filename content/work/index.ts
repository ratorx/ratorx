import { OLC } from "utils/location";
import * as skill from "../skill";
import * as Google from "./google";
import * as Grapeshot from "./grapeshot";
import * as IBM from "./ibm";
import { Event } from "utils/event";

export interface Work extends Event {
  company: string;
  location: OLC;

  role: string;
  skills: Set<skill.SkillNames>;
  summary: string[];

  content?: string;
}

export const data = { ...IBM, ...Grapeshot, ...Google };
