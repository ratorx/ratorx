import { PickByValue } from "utility-types";

export enum Type {
  LANGUAGE = "language",
  TECHNOLOGY = "technology",
}

export enum Level {
  BASIC = "basic",
  BEGINNER = "beginner",
  MODERATE = "moderate",
  PROFICIENT = "proficient",
  EXPERT = "expert",
  MAINTAINER = "maintainer",
}

type LevelNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Skill {
  name: string;
  type: Type;
  level: LevelNum;
}

export type SkillNames = keyof PickByValue<typeof data, Skill>;

// Skill Level Guide
// 10 - Maintainer: Actively involved in large decisions in the future of the
// underlying skill.
// 9, 8 - Expert: High level of theoretical AND practical knowledge -
// contribution to the skill required for 9.
// 7, 6 - Proficient: Professional experience - high level of theoretical OR
// practical knowledge required for 7.
// 5, 4 - Moderate: Good theoretical knowledge and some practical experience.
// Professional experience OR multiple large projects required for 5.
// 3, 2 - Beginner: Basic understanding of the skill. Some practical knowledge
// required for 3.
// 1, 0 - Basic: 0 should never be instantiated, since all skills qualify. 1
// requires minimal understanding.
export function getProficiency(skill: Skill): Level {
  switch (skill.level) {
    case 10:
      return Level.MAINTAINER;
    case 9:
    case 8:
      return Level.EXPERT;
    case 7:
    case 6:
      return Level.PROFICIENT;
    case 5:
    case 4:
      return Level.MODERATE;
    case 3:
    case 2:
      return Level.BEGINNER;
    case 1:
    case 0:
      return Level.BASIC;
  }
}

function language(skill: Omit<Skill, "type">): Skill {
  return { type: Type.LANGUAGE, ...skill };
}

function technology(skill: Omit<Skill, "type">): Skill {
  return { type: Type.TECHNOLOGY, ...skill };
}

export const data = {
  // Languages
  python: language({ name: "Python", level: 7 }),
  go: language({ name: "Go", level: 7 }),
  rust: language({ name: "Rust", level: 5 }),
  java: language({ name: "Java", level: 5 }),
  ts: language({ name: "Typescript", level: 4 }),
  cpp: language({ name: "C++", level: 5 }),

  // Technologies
  linux: technology({ name: "Linux", level: 7 }),
  git: technology({ name: "Git", level: 7 }),
  docker: technology({ name: "Docker", level: 6 }),
  k8s: technology({ name: "Kubernetes", level: 5 }),
  prometheus: technology({ name: "Prometheus", level: 4 }),
  webdev: technology({ name: "Web Design", level: 4 }),
};
