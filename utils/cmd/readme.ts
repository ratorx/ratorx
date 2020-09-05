import { config } from "content";
import * as work from "content/work";
import * as education from "content/education";
import {
  getOngoingOrLatest,
  compareEventsByImportance,
  isOngoing,
} from "utils/event";
import { getAddress } from "utils/location";
import { writeFileSync } from "fs";

let args = process.argv.slice(2);
if (args.length != 1) {
  console.error(
    `usage: ${process.argv.slice(0, 2).join(" ")} <path to README>`
  );
  process.exit(1);
}

function makeEducationTagline(e: education.Education) {
  if (isOngoing(e)) {
    return `I'm currently doing my ${e.qualification} at the ${e.institution}.`;
  }

  return `I've graduated with my ${e.qualification} from the ${e.institution}.`;
}

function makeWorkTagline(w: work.Work) {
  if (isOngoing(w)) {
    return `I'm currently working as a ${w.role} at the ${w.company} in ${
      getAddress(w.location).city
    }.`;
  }

  return `Former ${w.role} at ${w.company}.`;
}

function makeTagline(): string {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));
  if (compareEventsByImportance(w, e) > 0) {
    return makeEducationTagline(e);
  }

  return makeWorkTagline(w);
}

const content = `# ${config.first} ${config.last}
Hi! One day I'll think of something snappy to put here.

${makeTagline()}

Visit [my website](https://${
  config.sitename
}) so I can justify the amount of time it took me to kinda understand CSS.
`;

writeFileSync(args[0], content);
