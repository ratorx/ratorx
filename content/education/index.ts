import type { Event } from "utils/event";
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

  content?: string;
}

export function validate(education: Education) {}

export const data = { ...PGS, ...UG };
