import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Event, isOngoing } from "utils/event";
import { intervalString } from "utils/interval";
import { Anchor } from "web/shared";
import { timelineEntries } from "./data";

export type EntryProps = {
  title: string;
  subtitle: string;
  id: string;
  event: Event;
  summary: string[];
  isLeft?: boolean;
  icon: IconDefinition;
};

const SummaryList = ({ items }: { items: string[] }) => {
  return (
    <ul className="block ml-5 list-disc">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const Entry: preact.FunctionalComponent<EntryProps> = (props) => (
  <section className="max-w-md p-4 border border-gray-200 rounded-md shadow-lg md:max-w-lg">
    <Anchor id={props.id} />
    <div className="bg-blue-300 rounded-full icon">
      <FontAwesomeIcon icon={props.icon} />
    </div>
    <h2 className="text-xl font-medium tracking-wide">{props.title}</h2>
    <p className="flex items-center justify-start mt-1 space-x-2 tracking-tight text-gray-600">
      <span className="inline-block w-4 h-4">
        <FontAwesomeIcon icon={faCalendar} />
      </span>
      <span className="leading-none">
        {`${format(props.event.interval.start, "MMM Y")} - (${
          isOngoing(props.event)
            ? "ongoing"
            : intervalString(props.event.interval)
        })`}
      </span>
    </p>
    <p className="mt-2 font-semibold tracking-wide">{props.subtitle}</p>
    <SummaryList items={props.summary} />
  </section>
);

export const Timeline = (_: {}) => (
  // TODO: Collapse div and ol into 1 element
  <div className="flex items-center justify-center lg:block">
    <ol className="lg:pl-0 timeline">
      {timelineEntries.map((entry) => (
        <li
          key={entry.id}
          className={`timeline-entry ${
            // TODO: replace with responsive variant once tailwindlabs/tailwindcss#2349 is fixed
            entry.isLeft ? "timeline-entry-invert " : ""
          }block w-full lg:w-1/2 pb-4`}
        >
          <Entry {...entry} />
        </li>
      ))}
    </ol>
  </div>
);
