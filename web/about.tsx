import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBriefcase, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { assert } from "console";
import * as education from "content/education";
import * as work from "content/work";
import * as elements from "typed-html";
import { getAddress, makeURL, OLC } from "utils/location";
import * as link from "content/link";
import {
  isOngoing,
  getOngoingOrLatest,
  compareEventsByImportance,
} from "utils/event";
import { config } from "content";

function locationLink(code: OLC, contents?: string): string {
  if (contents === undefined) {
    const location = getAddress(code);
    contents = `${location.city}`;
  }
  return (
    <a
      class="p-1 bg-yellow-400 border rounded shadow hover:bg-yellow-300 active:bg-yellow-500 button"
      href={makeURL(code)}
      target="_blank"
      rel="noopener noreferrer"
      title="Open location in Google Maps"
    >
      {contents}
    </a>
  );
}

function timelineLink(contents: string, obj: any): string {
  return (
    <a
      class="p-1 bg-green-400 rounded shadow hover:bg-green-300 active:bg-green-500 button"
      title="This link doesn't do anything (yet)"
    >
      {contents}
    </a>
  );
}

function switchLink(contents: string, isPrimary: boolean) {
  const f = (b: boolean) => (b ? "primarytagline" : "secondarytagline");
  const id = f(isPrimary);
  const other = f(!isPrimary);
  return (
    <button
      class="p-1 bg-blue-300 rounded shadow hover:bg-blue-200 active:bg-blue-400 button"
      onclick={`switchElements("${other}", "${id}")`}
      aria-label={`Switch to the ${
        isPrimary ? "secondary" : "primary"
      } tagline`}
    >
      {contents}
    </button>
  );
}

function mobileSwitchLink(contents: string, isPrimary: boolean) {
  const f = (b: boolean) => (b ? "primarytagline" : "secondarytagline");
  const id = f(isPrimary);
  const other = f(!isPrimary);
  return (
    <button
      class="w-10 h-10 p-2 bg-blue-300 rounded-full shadow hover:bg-blue-200 active:bg-blue-400 sm:w-12 sm:h-12 sm:p-3"
      onclick={`switchElements("${other}", "${id}")`}
      aria-label={`Switch to the ${
        isPrimary ? "secondary" : "primary"
      } tagline`}
    >
      {contents}
    </button>
  );
}

function mainEducationTagline(
  e: education.Education,
  isPrimary: boolean
): string {
  const description = timelineLink(e.qualification, e);
  const location = locationLink(e.location, e.institution);
  if (isOngoing(e)) {
    return `${switchLink(
      "Currently studying",
      isPrimary
    )} for my ${description} at the ${location}`;
  }

  return `${switchLink(
    "Graduated",
    isPrimary
  )} with my ${description} from the ${location}`;
}

function mobileEducationTagline(
  e: education.Education,
  isPrimary: boolean
): string {
  return (
    mobileSwitchLink(icon(faUserGraduate).html.join(""), isPrimary) +
    (
      <p>
        {e.qualification}
        {isOngoing(e) ? "(current)" : ""}
      </p>
    )
  );
}

function mainWorkTagline(w: work.Work, isPrimary: boolean): string {
  const description = timelineLink(`${w.role} at ${w.company}`, w);
  const location = locationLink(w.location);
  if (isOngoing(w)) {
    return `${switchLink(
      "Currently working",
      isPrimary
    )} as a ${description} in ${location}`;
  }
  return `${switchLink(
    "Formerly worked",
    isPrimary
  )} as a ${description} in ${location}`;
}

function mobileWorkTagline(w: work.Work, isPrimary: boolean): string {
  return (
    mobileSwitchLink(icon(faBriefcase).html.join(""), isPrimary) +
    (
      <p>
        {`${!isOngoing(w) ? "Former " : ""}${w.role} at ${w.company}`}
        <span class="select-none">&nbsp;</span>
      </p>
    )
  );
}

interface Tagline {
  main: string;
  mobile: string;
}

function makeTagline(): string {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));

  const workTagline = (w: work.Work, b: boolean) => ({
    main: mainWorkTagline(w, b),
    mobile: mobileWorkTagline(w, b),
  });
  const educationTagline = (e: education.Education, b: boolean) => ({
    main: mainEducationTagline(e, b),
    mobile: mobileEducationTagline(e, b),
  });

  let primary: Tagline;
  let secondary: Tagline;

  if (compareEventsByImportance(w, e) > 0) {
    primary = educationTagline(e, true);
    secondary = workTagline(w, false);
  } else {
    primary = workTagline(w, true);
    secondary = educationTagline(e, false);
  }

  return (
    (
      <div id="primarytagline">
        <div class="hidden text-xl md:block">{primary.main}</div>
        <div class="flex items-center justify-start text-base sm:text-xl md:hidden space-x-2 sm:space-x-3">
          {primary.mobile}
        </div>
      </div>
    ) +
    (
      <div class="hidden" id="secondarytagline">
        <div class="hidden text-xl md:block">{secondary.main}</div>
        <div class="flex items-center justify-start text-base sm:text-xl md:hidden space-x-2 sm:space-x-3">
          {secondary.mobile}
        </div>
      </div>
    )
  );
}

function makeLinks(): string {
  const f = (link: link.Link, index: number) => (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      class="block w-10 h-10 p-2 sm:w-12 sm:h-12 sm:p-3 md:w-16 md:h-16 md:p-4 text-gray-200 bg-gray-600 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:shadow-outline active:bg-gray-700"
      title={link.name}
    >
      {icon(link.icon).html}
    </a>
  );
  return (
    <div class="flex space-x-3 md:space-x-4">
      {Object.values(link.data).map(f)}
    </div>
  );
}

const about = {
  id: "about",
  content: (
    <section class="flex items-center justify-center h-screen">
      <a id="about" class="navbar-anchor xl:no-navbar-anchor"></a>
      <div class="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12">
        <h1
          class="text-3xl font-bold tracking-wider text-gray-900 uppercase sm:text-5xl md:text-6xl comfortaa"
          style="text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5)"
        >
          {config.first} {config.last}
        </h1>
        {makeTagline()}
        {makeLinks()}
      </div>
    </section>
  ),
};

export default about;
