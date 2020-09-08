import { icon } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
  faBriefcase,
  faCalendar,
  faCode,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import * as education from "content/education";
import * as project from "content/project";
import * as work from "content/work";
import { format } from "date-fns";
import * as elements from "typed-html";
import { compareEventsByTime, Event, isOngoing } from "utils/event";
import { intervalString } from "utils/interval";
import { makeSection, Section } from "../section";

interface Entry {
  title: string;
  subtitle: string;
  id: string;
  event: Event;
  contents: string;
  isLeft: boolean;
  icon: IconDefinition;
}

function renderEntry(entry: Entry): string {
  return (
    <div class="pb-4">
      <section class="max-w-md p-4 border border-gray-300 shadow-lg md:max-w-lg rounded-md">
        <div id={entry.id} class="navbar-anchor xl:no-navbar-anchor"></div>
        <div class="block rounded-full bg-blue-300 icon">
          {icon(entry.icon).html}
        </div>
        <h2 class="text-xl font-medium tracking-wide">{entry.title}</h2>
        <p class="flex items-center justify-start tracking-tight text-gray-600 space-x-2 mt-1">
          <span class="inline-block w-4 h-4">{icon(faCalendar).html}</span>
          <span class="leading-none">
            {`${format(entry.event.interval.start, "MMM Y")} - (${
              isOngoing(entry.event)
                ? "ongoing"
                : intervalString(entry.event.interval)
            })`}
          </span>
        </p>
        <p class="mt-2">
          <span class="font-semibold tracking-wide">{entry.subtitle}</span>
          {entry.contents}
        </p>
      </section>
    </div>
  );
}

function renderBulletList(s: string[]): string {
  const bulletpoint = (s: string) => <li>{s}</li>;
  return <ul class="block ml-5 list-disc">{s.map(bulletpoint)}</ul>;
}

function workEntry(w: work.Work): Entry {
  return {
    title: w.company,
    subtitle: w.role,
    id: work.id(w),
    event: w,
    contents: renderBulletList(w.summary),
    isLeft: false,
    icon: faBriefcase,
  };
}

function educationEntry(e: education.Education): Entry {
  return {
    title: e.institution,
    subtitle: e.qualification,
    id: education.id(e),
    event: e,
    contents: renderBulletList(e.results.map((r) => `${r.name} (${r.result})`)),
    isLeft: true,
    icon: faGraduationCap,
  };
}

function projectEntry(p: project.Project): Entry {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
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
    contents: renderBulletList(p.summary),
    isLeft: true,
    icon: faCode,
  };
}

function renderTimeline(): string {
  let entries: Entry[] = [
    ...Object.values(work.data).map(workEntry),
    ...Object.values(education.data).map(educationEntry),
    ...Object.values(project.data).map(projectEntry),
  ];
  entries.sort((e1, e2) => compareEventsByTime(e1.event, e2.event));
  const f = (entry: Entry) => (
    <li
      class={`timeline-entry ${
        // TODO: replace with responsive variant once tailwindlabs/tailwindcss#2349 is fixed
        entry.isLeft ? "timeline-entry-invert " : ""
      }block w-full lg:w-1/2`}
    >
      {renderEntry(entry)}
    </li>
  );
  return <ol class="lg:pl-0 timeline">{entries.map(f)}</ol>;
}

const timeline: Section = makeSection({
  id: "experience",
  title: "Experience & Education",
  body: (
    <div class="flex items-center justify-center lg:block">
      {renderTimeline()}
    </div>
  ),
  maxWidth: "max-w-6xl",
});
export default timeline;
