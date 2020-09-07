import { getUnixTime } from "date-fns";
import type { Event } from "utils/event";
import { makeID } from "utils/id";
import { OLC } from "utils/location";
import * as PGS from "./pgs";
import * as UG from "./ug";

export interface Result {
  name: string;
  result: string;
}

export interface Education extends Event {
  institution: string;
  location: OLC;

  role: string;
  qualification: string;
  results: Result[];
  resultAggregate: string;
}

export function id(education: Education): string {
  return makeID(education.institution + getUnixTime(education.interval.start));
}

export const data = { ...PGS, ...UG };
