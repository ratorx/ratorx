import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faUserGraduate,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
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

interface PrefixedLink {
  prefix: string;
  content: string;
}

interface SwitchButtonDisplay {
  mobileButton: IconDefinition;
  mainButton: string;
}

interface CoreDisplay {
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

function makeEducationTagline(e: education.Education): Tagline {
  return {
    button: {
      mobileButton: faUserGraduate,
      mainButton: isOngoing(e) ? "Currently studying" : "Graduated",
    },
    core: {
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

function makeWorkTagline(w: work.Work): Tagline {
  return {
    button: {
      mobileButton: faBriefcase,
      mainButton: isOngoing(w) ? "Currently working" : "Formerly worked",
    },
    core: {
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

function makeTagline(tagline: Tagline, isPrimary: boolean): string {
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
        class="w-10 h-10 p-2 bg-blue-300 rounded-full shadow-md md:w-auto md:h-auto md:p-1 md:rounded hover:bg-blue-200 active:bg-blue-400 sm:w-12 sm:h-12 sm:p-3"
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
          class="p-1 bg-green-400 rounded shadow-md hover:bg-green-300 active:bg-green-500 inline-block"
          title="Link to timeline entry"
        >
          {tagline.core.main.content}
        </a>
      </span>
      <span class="hidden md:inline">
        {`&nbsp;${tagline.location.link.prefix}`}
        <a
          class="p-1 bg-yellow-400 rounded shadow-md hover:bg-yellow-300 active:bg-yellow-500 inline-block"
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

function makeCombinedTagline(): string {
  const w = getOngoingOrLatest(Object.values(work.data));
  const e = getOngoingOrLatest(Object.values(education.data));

  let primary = makeWorkTagline(w);
  let secondary = makeEducationTagline(e);

  if (compareEventsByImportance(w, e) > 0) {
    [primary, secondary] = [secondary, primary];
  }

  return makeTagline(primary, true) + makeTagline(secondary, false);
}

function makeLinks(): string {
  const f = (link: link.Link) => (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      class="block w-10 h-10 p-2 text-gray-200 bg-gray-600 rounded-full shadow-lg sm:w-12 sm:h-12 sm:p-3 md:w-16 md:h-16 md:p-4 hover:bg-gray-500 active:bg-gray-700"
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
    <section class="flex items-center justify-center py-16 xl:h-screen sm:py-24 md:py-32 lg:py-48">
      <a id="about" class="navbar-anchor xl:no-navbar-anchor"></a>
      <div class="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12">
        <h1
          class="text-3xl font-bold tracking-wider text-gray-900 uppercase sm:text-5xl md:text-6xl comfortaa"
          style="text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5)"
        >
          {`${config.first} ${config.last}`}
        </h1>
        {makeCombinedTagline()}
        {makeLinks()}
      </div>
    </section>
  ),
};

export default about;
