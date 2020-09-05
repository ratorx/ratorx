import { date } from "utils/interval";
import { olc } from "utils/location";
import { Work } from ".";

export const ibm: Work = {
  company: "IBM",
  location: olc("9C3W2JG3+C4"),
  interval: { start: date("3 Aug 2015"), end: date("7 Aug 2015") },

  role: "Work Experience",
  skills: new Set(["ts", "webdev"]),
  summary: [
    "Work experience on the Product Deployment team, which handled provisioning demos for clients.",
    "Improved the interface of a website to automate product demo deployment.",
  ],
};
