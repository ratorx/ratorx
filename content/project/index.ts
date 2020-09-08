import * as skill from "content/skill";
import { getUnixTime } from "date-fns";
import { Event } from "utils/event";
import { makeID } from "utils/id";
import { date } from "utils/interval";

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

export function id(project: Project) {
  return makeID(project.title + getUnixTime(project.interval.start));
}

function solo(project: Omit<Project, "type">): Project {
  return {
    ...project,
    type: { kind: "solo" },
  };
}

function team(
  project: Omit<Project, "type">,
  role: string,
  size: Exclude<number, 0>
): Project {
  return {
    ...project,
    type: {
      kind: "team",
      role: role,
      size: size,
    },
  };
}

export const data = {
  continuity: solo({
    title: "Continuity - Streaming over BitTorrent",
    interval: { start: date("23 Oct 2018"), end: date("18 May 2019") },
    skills: new Set(["rust", "docker", "linux", "git"]),
    summary: [
      "Created a BitTorrent client capable of streaming video which is optimised for low upload bandwidth.",
      "Evaluated the effect on peer-to-peer viability and performance of multiple streaming-compatible piece selection strategies.",
      "Received a mark equivalent to a Class I for the dissertation.",
    ],
  }),
  mapreduce: team(
    {
      title: "MapReduce on Kubernetes",
      interval: { start: date("6 Nov 2018"), end: date("30 Nov 2018") },
      skills: new Set(["python", "linux", "docker", "k8s", "git"]),
      summary: [
        "Worked on coursework project to measure the performance of different MapReduce tasks on Kubernetes.",
        "Developed a custom MapReduce framework leveraging Kubernetes.",
        "Evaluated the performance of the custom framework against Apache Spark for a simple application on datasets of different sizes.",
        "Improved the performance of multiple concurrent MapReduce jobs by developing a system to dynamically allocate nodes to each job.",
      ],
    },
    "member",
    2
  ),
  wearablehousecontrol: team(
    {
      title: "Wearable House Control",
      interval: { start: date("18 Jan 2018"), end: date("13 Mar 2018") },
      skills: new Set(["go", "java", "linux", "git"]),
      summary: [
        "Developed a Android Wear application to control smart home devices.",
        "Integrated a location service with Android Wear to provide room-level location triggers.",
        "Implemented an framework in Go to allow configurable automatic control of smart home devices based on the location of multiple users.",
      ],
    },
    "member",
    6
  ),
};
