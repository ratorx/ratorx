import * as crypto from "crypto";

// The strategy is to use a truncated SHA256
// In the best case there are 64^5 possiblities
export function makeID(entropy: string): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(entropy))
    .digest("base64")
    .slice(0, 5)
    .replace("+", "-")
    .replace("/", "_");
}
