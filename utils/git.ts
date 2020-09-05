import { execSync } from "child_process";

function git(...args: string[]): string {
  return execSync(["git", ...args].join(" "), { encoding: "utf-8" }).trim();
}

export function originURL(): string {
  let url = git("config", "--get", "remote.origin.url");
  if (url.startsWith("git@")) {
    url = url.replace(/git@(.+):(.+)/, "https://$1/$2");
  }

  return url.replace(/\.git$/, "");
}

export function getCommit(): string {
  if (process.env.COMMIT_REF !== undefined) {
    return process.env.COMMIT_REF;
  }

  return git("rev-parse", "HEAD");
}
