import {
  faBriefcase,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import * as education from "content/education";
import * as work from "content/work";
import {
  compareEventsByImportance,
  getOngoingOrLatest,
  isOngoing
} from "utils/event";
import { getAddress } from "utils/location";
import { FullTaglineProps, TaglineProps } from "web/hero/tagline";

const educationTagline = ( e: education.Education): Omit<TaglineProps, "isPrimary"> =>({
    mobileButtonIcon: faGraduationCap,
    mobileText: `${e.qualification}${isOngoing(e) ? " (current)" : ""}`,

    buttonText: isOngoing(e) ? "Currently studying" : "Graduated",

    rolePrefix: isOngoing(e) ? "for my" : "with my",
    role: e.qualification,
    roleLinkID: education.id(e),

    locationPrefix: isOngoing(e) ? "at the" : "from the",
    locationName: e.institution,
    locationCode: e.location,
})

const workTagline = (w: work.Work): Omit<TaglineProps, "isPrimary"> => ({
    mobileButtonIcon: faBriefcase,
    mobileText: `${isOngoing(w) ? "" : "Former "}${w.role} at ${w.company}`,

    buttonText: isOngoing(w) ? "Currently working" : "Formerly worked",

    rolePrefix: "as a",
    role: `${w.role} at ${w.company}`,
    roleLinkID: work.id(w),

    locationPrefix: "in",
    locationName: getAddress(w.location).city,
    locationCode: w.location,
})

function getFullTaglineProps(): FullTaglineProps {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));

  let primary = workTagline(w);
  let secondary = educationTagline(e);

  if (compareEventsByImportance(w, e) > 0) {
    [primary, secondary] = [secondary, primary];
  }

  return { primary: primary, secondary: secondary };
}

export const fullTaglineProps = getFullTaglineProps();
