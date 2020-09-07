import * as skill from "content/skill";
import { Event } from "utils/event";

export type Type =
  | { kind: "solo" }
  | {
      kind: "team";
      role: string;
      size: Exclude<number, 0>;
    };

export interface Project extends Event {
  title: string;

  type: Type;
  skills: Set<skill.SkillNames>;
  summary: string[];
}
