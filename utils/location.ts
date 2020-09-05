import { existsSync, readFileSync, writeFileSync } from "fs";
import OpenLocationCode from "open-location-code-typescript";
import request from "sync-request";
import { Brand } from "utility-types";

export type OLC = Brand<string, "OLC">;
export type Location = { city: string; country: string; country_code: string };

export function olc(code: string): OLC {
  OpenLocationCode.decode(code);
  return code as OLC;
}

export function makeURL(code: OLC) {
  return `https://google.com/maps/place/${encodeURIComponent(code)}`;
}

const cacheLocation = "./build/cache/olc.json";

function fetchCache(): Map<string, Location> {
  if (existsSync(cacheLocation)) {
    const json = readFileSync(cacheLocation, "utf-8");
    return new Map(Object.entries(JSON.parse(json)));
  }

  return new Map();
}

function resolveOLC(code: OLC): Location {
  const location = OpenLocationCode.decode(code);
  let res = request(
    "GET",
    `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.LOCATIONIQ_API_KEY}&lat=${location.latitudeCenter}&lon=${location.longitudeCenter}&format=json&zoom=10`
  );

  const body = res.getBody();
  if (body instanceof Buffer) {
    return JSON.parse(body.toString()).address as {
      city: string;
      country: string;
      country_code: string;
    };
  } else {
    throw new Error(body);
  }
}

export function getAddress(code: OLC): Location {
  let cache = fetchCache();
  if (cache.has(code)) {
    return cache.get(code) as Location;
  }

  const location = resolveOLC(code);
  cache = cache.set(code, location);
  writeFileSync(cacheLocation, JSON.stringify(Object.fromEntries(cache)));
  return location;
}
