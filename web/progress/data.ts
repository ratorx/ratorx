import * as skill from "content/skill";
import { GroupProps } from "web/progress";

type SkillGroup = { type: skill.Type; skills: skill.Skill[] };

function getBarColourClass(
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
): string {
  switch (level) {
    case 10:
    case 9:
      return "bg-red-500";
    case 8:
    case 7:
      return "bg-green-500";
    case 6:
    case 5:
      return "bg-blue-400";
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
      return "bg-yellow-500";
  }
}

function getGroupProps(): GroupProps[] {
  let skillMap = new Map<skill.Type, skill.Skill[]>();

  for (let s of Object.values(skill.data)) {
    skillMap.set(s.type, skillMap.get(s.type) || []);
    skillMap.get(s.type)?.push(s);
  }

  let groupProps: GroupProps[] = [];

  skillMap.forEach((skills, skillType) => {
    // Only interested in skills with reasonable proficiency
    skills = skills.filter((sk) => sk.level > 3);
    // Sort the skills by descending by level and ascending by name
    skills.sort((s1, s2) => {
      const descLevelSort = s2.level - s1.level;
      return descLevelSort == 0
        ? s1.name.localeCompare(s2.name)
        : descLevelSort;
    });

    groupProps.push({
      name: `${skillType}`,
      bars: skills.map((sk) => ({
        name: sk.name,
        level: sk.level,
        barColourClass: getBarColourClass(sk.level),
      })),
    });
  });

  return groupProps;
}

export const skillGroups = getGroupProps();
