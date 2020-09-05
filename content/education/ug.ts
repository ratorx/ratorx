import { date } from "utils/interval";
import { olc } from "utils/location";
import type { Education } from ".";

const One = "Class I";
const TwoOne = "Class II.i";

export const ug: Education = {
  institution: "University of Cambridge",
  location: olc("9F42637X+7W"),
  interval: { start: date("6 Oct 2016"), end: date("29 Jun 2019") },
  role: "Undergraduate",
  qualification: "BA in Computer Science",
  results: [
    { name: "First Year", result: One },
    { name: "Second Year", result: TwoOne },
    { name: "Third Year", result: TwoOne },
  ],
  resultAggregate: TwoOne,
};
