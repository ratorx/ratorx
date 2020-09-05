import { date } from "utils/interval";
import { olc } from "utils/location";
import { Work } from ".";

const common = {
  location: olc("9F426477+R4"),
};

export const grapeshot: Work = {
  ...common,
  company: "Grapeshot",
  interval: { start: date("3 Jul 2017"), end: date("22 Sep 2017") },

  role: "Software Development Intern",
  skills: new Set(["ts", "webdev", "go", "python", "docker", "git", "linux"]),
  summary: [
    "Worked in a development team focusing on new products and integration with old services.",
    "Added functionality to the video categorisation API.",
    "Fixed critical bugs in the self-service developer portal written in Django.",
    "Responsible for maintaining existing SDKs and developing a new Go SDK.",
    "Helped design a organisation-wide account management system.",
  ],
};

export const oracle: Work = {
  ...common,
  company: "Grapeshot/Oracle Data Cloud",
  interval: { start: date("25 Jun 2018"), end: date("31 Aug 2018") },

  role: "Systems Intern",
  // ["go", "python", "terraform", "k8s", "aws", "cpp", "prometheus", "git", "linux"]
  skills: new Set(["go", "python", "k8s", "cpp", "prometheus", "git", "linux"]),
  summary: [
    "Worked primarily in a DevOps team focused on administrating and monitoring all the cloud deployments on AWS.",
    "Contributed to an open-source project which makes AWS resource metadata available via a Prometheus exporter.",
    "Migrated the infrastructure in an AWS region into reusable Terraform modules.",
    "Helped debug networking issues on the Kubernetes cluster.",
    "Developed a C++ wrapper for the core systems of Grapeshot to allow easier development.",
  ],
};
