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

  role: "Site Reliability Engineering Intern",
  skills: new Set(),
  summary: [
    "Worked with the SRE team that maintains the ingress load balancing infrastructure.",
    "Designed a statistical model for the noisiness of ingress traffic.",
    "Implemented a system to calculate the optimal headroom based for a datacenter given the acceptable overload risk.",
    "Increased the available peak capacity in multiple edge datacenters by 2-7%.",
  ],
};

export const google: Work = {
  ...common,
  interval: openInterval(date("3 Feb 2020")),

  role: "Site Reliability Engineer",
  skills: new Set(),
  summary: [
    "Currently working on the team responsible for routing users to the optimal datacenter based on latency and load.",
  ],
};
