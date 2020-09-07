import {
  compareDesc,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  Interval,
  parse as dateparse,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

// date takes in a simple date and the timezone and returns the equivalent date
// in UTC. If stable output from date fields is required, convert to an epoch
// timestamp first.
export function date(d: string, timezone?: string): Date {
  if (timezone === undefined) {
    timezone = "Europe/London";
  }
  return zonedTimeToUtc(dateparse(d, "d MMM y", new Date()), timezone);
}

function intervalFormat(n: number, unit: string): string {
  switch (n) {
    case 1:
      return `1 ${unit}`;
    default:
      return `${n} ${unit}s`;
  }
}

export function intervalString(interval: Interval): string {
  const yearDiff = differenceInYears(interval.end, interval.start);
  const monthDiff =
    differenceInMonths(interval.end, interval.start) - 12 * yearDiff;

  const effectiveYearDiff = yearDiff + (monthDiff > 7 ? 1 : 0);

  // > 0 effective years => year granularity
  if (effectiveYearDiff > 0) {
    return intervalFormat(effectiveYearDiff, "year");
  }

  // > 5 effective months => month granularity
  if (monthDiff > 5) {
    return intervalFormat(monthDiff, "month");
  }

  const weekDiff = differenceInWeeks(interval.end, interval.start);
  const dayDiff = differenceInDays(interval.end, interval.start) - weekDiff * 4;

  // Internship rule
  // 1 month == 4 weeks if > 3 full weeks
  if (weekDiff > 3) {
    return intervalFormat(Math.round(weekDiff / 4), "month");
  }

  const effectiveWeekDiff = weekDiff + (dayDiff > 3 ? 1 : 0);

  // > 0 effective weeks => week granularity
  if (effectiveWeekDiff > 0) {
    return intervalFormat(effectiveWeekDiff, "week");
  }

  // otherwise day granularity
  if (dayDiff > 0) {
    return intervalFormat(dayDiff, "day");
  }

  return intervalFormat(1, "day");
}

// Define a constant finish date to allow comparisons and a safe API around it.
const now = Date.now();

export function openInterval(start: Date): Interval {
  return { start: start, end: now };
}

export function isOpenInterval(interval: Interval): boolean {
  return compareDesc(interval.end, now) <= 0;
}
