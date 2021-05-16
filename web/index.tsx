import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import render from "preact-render-to-string";
import { Main } from "./routes";
import { BlogList } from "./routes/blog";
import { Resume } from "./routes/resume";

declare module "preact" {
  interface Attributes {
    onclick?: string;
  }
}

let args = process.argv.slice(2);
if (args.length != 1) {
  console.error(`usage: ${process.argv.slice(0, 2).join(" ")} <output base>`);
  process.exit(1);
}

const baseDir = args[0];

async function makePage(path: string, page: preact.VNode) {
  const pagePath = join(baseDir, path);
  await mkdir(dirname(pagePath), { recursive: true });
  return writeFile(pagePath, "<!DOCTYPE html>" + render(page));
}

makePage("index.html", <Main />)
makePage("resume.html", <Resume />)
makePage("blog/index.html", <BlogList />)