import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faGraduationCap,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import * as education from "content/education";
import * as work from "content/work";
import * as elements from "typed-html";
import {
  compareEventsByImportance,
  getOngoingOrLatest,
  isOngoing,
} from "utils/event";
import { getAddress, makeURL, OLC } from "utils/location";

interface PrefixedLink {
  prefix: string;
  content: string;
}

interface SwitchButtonDisplay {
  mobileButton: IconDefinition;
  mainButton: string;
}

interface CoreDisplay {
  linkID: string;
  main: PrefixedLink;
  mobile: string;
}

interface LocationDisplay {
  code: OLC;
  link: PrefixedLink;
}

interface Tagline {
  button: SwitchButtonDisplay;
  core: CoreDisplay;
  location: LocationDisplay;
}

function educationTagline(e: education.Education): Tagline {
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

function workTagline(w: work.Work): Tagline {
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

function renderTagline(tagline: Tagline, isPrimary: boolean): string {
  const f = (b: boolean) => (b ? "primarytagline" : "secondarytagline");
  const id = f(isPrimary);
  const other = f(!isPrimary);
  return (
    <div
      id={id}
      class={`flex items-center justify-start text-base sm:text-xl space-x-2 sm:space-x-3 md:space-x-0 ${
        isPrimary ? "" : "hidden"
      }`}
    >
      <button
        class="rounded-full md:w-auto md:h-auto md:p-1 md:rounded icon primary-button"
        onclick={`switchElements("${other}", "${id}")`}
        aria-label={`Switch to the ${
          isPrimary ? "secondary" : "primary"
        } tagline`}
        type="button"
      >
        <span class="md:hidden">{icon(tagline.button.mobileButton).html}</span>
        <span class="hidden md:inline">{tagline.button.mainButton}</span>
      </button>
      <p class="md:hidden">
        {tagline.core.mobile}
        <span class="select-none">&nbsp;</span>
      </p>
      <span class="hidden md:inline">
        {`&nbsp;${tagline.core.main.prefix}`}
        <a
          class="inline-block p-1 rounded secondary-button"
          title="Link to timeline entry"
          href={`#${tagline.core.linkID}`}
        >
          {tagline.core.main.content}
        </a>
      </span>
      <span class="hidden md:inline">
        {`&nbsp;${tagline.location.link.prefix}`}
        <a
          class="inline-block p-1 rounded tertiary-button"
          href={makeURL(tagline.location.code)}
          target="_blank"
          rel="noopener noreferrer"
          title="Open location in Google Maps"
        >
          {tagline.location.link.content}
        </a>
      </span>
    </div>
  );
}

export function renderTaglineSection(): string {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));

  let primary = workTagline(w);
  let secondary = educationTagline(e);

  if (compareEventsByImportance(w, e) > 0) {
    [primary, secondary] = [secondary, primary];
  }

  return renderTagline(primary, true) + renderTagline(secondary, false);
}
