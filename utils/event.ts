import { compareDesc } from "date-fns";
import { isOpenInterval } from "./interval";

// API for events, which happen over intervals
export interface Event {
  interval: Interval;
}

// Comparator for ordering events from latest to oldest
// < 0 means a later interval
export function compareEventsByTime(event1: Event, event2: Event): number {
  const startBefore = compareDesc(event1.interval.start, event2.interval.start); // -1 before; 0 equal; 1 after
  return startBefore == 0
    ? compareDesc(event1.interval.end, event2.interval.end)
    : startBefore;
}

export function isOngoing(event: Event): boolean {
  return isOpenInterval(event.interval);
}

// Get the latest ongoing event, or just the latest
export function getOngoingOrLatest<T extends Event>(events: T[]): T {
  const ongoing = events.filter((event) => isOngoing(event));
  if (ongoing.length == 0) {
    return events.reduce((latest, e) =>
      compareEventsByTime(latest, e) <= 0 ? latest : e
    );
  } else {
    return ongoing.reduce((latest, e) =>
      compareEventsByTime(latest, e) <= 0 ? latest : e
    );
  }
}

// compare Events and order by importance
// basically the same as a byTime comparision, but it prefers ongoing events
export function compareEventsByImportance(
  event1: Event,
  event2: Event
): number {
  const event1Ongoing = isOngoing(event1);
  const event2Ongoing = isOngoing(event2);
  if (event1Ongoing === event2Ongoing) {
    return compareEventsByTime(event1, event2);
  } else if (event1Ongoing) {
    return -1;
  } else {
    // event2Ongoing === true
    return 1;
  }
}
