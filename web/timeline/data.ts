import {
  faBriefcase,
  faCode,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import * as education from "content/education";
import * as project from "content/project";
import * as work from "content/work";
import { compareEventsByTime } from "utils/event";
import { capitalize } from "utils/misc";
import { EntryProps } from ".";

function workEntry(w: work.Work): EntryProps {
  return {
    title: w.company,
    subtitle: w.role,
    id: work.id(w),
    event: w,
    summary: w.summary,
    isLeft: false,
    icon: faBriefcase,
  };
}

function educationEntry(e: education.Education): EntryProps {
  return {
    title: e.institution,
    subtitle: e.qualification,
    id: education.id(e),
    event: e,
    summary: e.results.map((r) => `${r.name} (${r.result})`),
    isLeft: true,
    icon: faGraduationCap,
  };
}

function projectEntry(p: project.Project): EntryProps {
  const subtitle = (t: project.Type) => {
    switch (t.kind) {
      case "solo":
        return "Solo";
      case "team":
        return `${capitalize(t.role)} (team of ${t.size})`;
    }
  };
  return {
    title: p.title,
    subtitle: subtitle(p.type),
    id: project.id(p),
    event: p,
    summary: p.summary,
    isLeft: true,
    icon: faCode,
  };
}

function getEntryProps(): EntryProps[] {
  let entries = [
    ...Object.values(work.data).map(workEntry),
    ...Object.values(education.data).map(educationEntry),
    ...Object.values(project.data).map(projectEntry),
  ];
  entries.sort((e1, e2) => compareEventsByTime(e1.event, e2.event));
  return entries;
}

export const timelineEntries = getEntryProps();
