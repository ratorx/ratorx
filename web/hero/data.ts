import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import * as education from "content/education";
import * as work from "content/work";
import {
  compareEventsByImportance,
  getOngoingOrLatest,
  isOngoing,
} from "utils/event";
import { getAddress } from "utils/location";
import { TaglineProps, TaglineSectionProps } from "web/hero/tagline";

function educationTagline(
  e: education.Education
): Omit<TaglineProps, "isPrimary"> {
  return {
    button: {
      mobileButton: faGraduationCap,
      mainButton: isOngoing(e) ? "Currently studying" : "Graduated",
    },
    core: {
      linkID: education.id(e),
      main: {
        prefix: isOngoing(e) ? "for my" : "with my",
        content: e.qualification,
      },
      mobile: `${e.qualification}${isOngoing(e) ? " (current)" : ""}`,
    },
    location: {
      code: e.location,
      link: {
        prefix: isOngoing(e) ? "at the" : "from the",
        content: e.institution,
      },
    },
  };
}

function workTagline(w: work.Work): Omit<TaglineProps, "isPrimary"> {
  return {
    button: {
      mobileButton: faBriefcase,
      mainButton: isOngoing(w) ? "Currently working" : "Formerly worked",
    },
    core: {
      linkID: work.id(w),
      main: {
        prefix: "as a",
        content: `${w.role} at ${w.company}`,
      },
      mobile: `${isOngoing(w) ? "" : "Former "}${w.role} at ${w.company}`,
    },
    location: {
      code: w.location,
      link: {
        prefix: "in",
        content: getAddress(w.location).city,
      },
    },
  };
}

function getTaglineSectionProps(): TaglineSectionProps {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));

  let primary = workTagline(w);
  let secondary = educationTagline(e);

  if (compareEventsByImportance(w, e) > 0) {
    [primary, secondary] = [secondary, primary];
  }

  return { primary: primary, secondary: secondary };
}

export const taglineSectionProps = getTaglineSectionProps();
