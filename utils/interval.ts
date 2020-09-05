import {
  compareDesc,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  parse as dateparse,
} from "date-fns";
import type { Interval } from "date-fns";

// Utilities for formatting intervals
export function date(d: string): Date {
  return dateparse(d, "d MMM y", new Date());
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
    return intervalFormat(effectiveYearDiff, "Year");
  }

  // > 5 effective months => month granularity
  if (monthDiff > 5) {
    return intervalFormat(monthDiff, "Month");
  }

  const weekDiff = differenceInWeeks(interval.end, interval.start);
  const dayDiff = differenceInDays(interval.end, interval.start) - weekDiff * 4;

  // Internship rule
  // 1 month == 4 weeks if > 3 full weeks
  if (weekDiff > 3) {
    return intervalFormat(Math.round(weekDiff / 4), "Month");
  }

  const effectiveWeekDiff = weekDiff + (dayDiff > 3 ? 1 : 0);

  // > 0 effective weeks => week granularity
  if (effectiveWeekDiff > 0) {
    return intervalFormat(effectiveWeekDiff, "Week");
  }

  // otherwise day granularity
  if (dayDiff > 0) {
    return intervalFormat(dayDiff, "Day");
  }

  return intervalFormat(1, "Day");
}

// Define a constant finish date to allow comparisons and a safe API around it.
const now = Date.now();

export function openInterval(start: Date): Interval {
  return { start: start, end: now };
}

export function isOpenInterval(interval: Interval): boolean {
  return compareDesc(interval.end, now) <= 0;
}