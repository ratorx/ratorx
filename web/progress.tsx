import * as skill from "content/skill";
import * as elements from "typed-html";
import { Section } from "./section";

type SkillGroup = { type: skill.Type; skills: skill.Skill[] };

function groupSkills(skills: Record<string, skill.Skill>): SkillGroup[] {
  let skillMap = new Map<skill.Type, skill.Skill[]>();

  for (let s of Object.values(skills)) {
    skillMap.set(s.type, skillMap.get(s.type) || []);
    skillMap.get(s.type)?.push(s);
  }

  let skillArray: SkillGroup[] = [];

  skillMap.forEach((skills, skillType) => {
    // Sort the skills by descending by level and ascending by name
    skills.sort((s1, s2) => {
      const descLevelSort = s2.level - s1.level;
      return descLevelSort == 0
        ? s1.name.localeCompare(s2.name)
        : descLevelSort;
    });

    skillArray.push({ type: skillType, skills: skills });
  });

  return skillArray;
}

// Bar utilities
function getBarColour(
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

// Make a full bar with the text inside
function makeFullBar(sk: skill.Skill): string {
  const l = skill.getProficiency(sk);
  return (
    <div class="bg-gray-400 rounded-lg shadow">
      <div
        style={`width: ${sk.level * 10}%`}
        class={`${getBarColour(sk.level)} ${
          l === skill.Level.MAINTAINER ? "rounded-lg" : "rounded-l-lg"
        } py-1 px-2`}
      >
        {sk.name}
      </div>
    </div>
  );
}

// Make a segmented bar with the separate text
function makeSegmentedBar(sk: skill.Skill): string {
  const segment = (fill: 0 | 1 | 2) => (
    <div class="w-10 bg-gray-400 rounded-full shadow">
      {fill != 0 ? (
        <div
          class={`${getBarColour(sk.level)} ${
            fill == 1 ? "rounded-l-full" : "rounded-full"
          } px-2 py-1 select-none`}
          style={`width: ${fill * 50}%`}
        >
          &nbsp;
        </div>
      ) : (
        ""
      )}
    </div>
  );

  const numFull = Math.floor(sk.level / 2);
  const numPartial = sk.level % 2;
  const numEmpty = 5 - numFull - numPartial;
  return (
    <p class="flex items-center">{sk.name}</p> +
    (
      <div class="flex space-x-2">
        {segment(2).repeat(numFull)}
        {segment(1).repeat(numPartial)}
        {segment(0).repeat(numEmpty)}
      </div>
    )
  );
}

function makeItem(sk: skill.Skill): string {
  return (
    <li>
      <div class="justify-between hidden lg:flex">{makeSegmentedBar(sk)}</div>
      <div class="lg:hidden">{makeFullBar(sk)}</div>
    </li>
  );
}

function makeSection(group: SkillGroup, index: number): string {
  return (
    <section class={`w-full lg:w-1/2 ${(index % 2) == 0 ? "lg:pr-6" : "lg:pl-6"}`}>
      <h2 class="tracking-tight text-gray-700 uppercase">{group.type}</h2>
      <ul class="mt-1 text-sm md:text-base space-y-2">
        {group.skills.filter((sk) => sk.level > 3).map(makeItem)}
      </ul>
    </section>
  );
}

const progress: Section = {
  id: "skills",
  title: "Skills",
  content: (
    <div class="flex flex-wrap space-y-4 lg:space-y-0 lg:divide-x">
      {groupSkills(skill.data).map(makeSection)}
    </div>
  ),
};
export default progress;
