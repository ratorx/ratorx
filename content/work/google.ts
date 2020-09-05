import { date, openInterval } from "utils/interval";
import { olc } from "utils/location";
import { Work } from ".";

const common = {
  company: "Google",
  location: olc("9C3XGVMF+7M"),
};

export const googleintern: Work = {
  ...common,
  interval: { start: date("25 Jun 2019"), end: date("20 Sep 2019") },

  role: "SRE Intern",
  skills: new Set(),
  summary: [], // TODO
};

export const google: Work = {
  ...common,
  interval: openInterval(date("3 Feb 2020")),

  role: "Site Reliability Engineer",
  skills: new Set(),
  summary: [
    "Worked on the traffic-steering team, which is responsible for routing users to the optimal datacenter based on latency and current load.",
  ], // TODO
};
