import { date } from "utils/interval";
import { olc } from "utils/location";
import { Education } from ".";

const maxResult = (s: string) => ({ name: s, result: "A*" });

const gcseResults = [
  { name: "History", result: "A" },
  ...[
    "English Language",
    "English Literature",
    "Latin",
    "Greek",
    "Spanish",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Additional Mathematics",
  ].map(maxResult),
];

const alevelResults = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
].map(maxResult);

const common = {
  institution: "Portsmouth Grammar School",
  location: olc("9C2WQWR2+V4"),
};

export const gcse: Education = {
  ...common,
  interval: { start: date("3 Sep 2009"), end: date("11 Jul 2014") },
  role: "Student",
  qualification: "GCSE",
  results: gcseResults,
  resultAggregate: "10 A* 1 A",
};

export const alevel: Education = {
  ...common,
  interval: { start: date("3 Sep 2014"), end: date("8 Jul 2016") },
  role: "Student",
  qualification: "A-Level",
  results: alevelResults,
  resultAggregate: "4 A*",
};
