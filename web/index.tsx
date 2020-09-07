import { config } from "content";
import { writeFileSync } from "fs";
import * as elements from "typed-html";
import { renderNav } from "./navigation";
import { Section } from "./section";
import hero from "./sections/hero";
import progress from "./sections/progress";
import timeline from "./sections/timeline";

function makeMeta(kvs: { name: string; content: string }[]): string {
  return kvs
    .map((kv) => <meta name={kv.name} content={kv.content}></meta>)
    .join("");
}

const kvs = [
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "description", content: config.description },
  { name: "author", content: [config.first, config.last].join(" ") },
];

const liveReload = <script src="http://livejs.com/live.js"></script>;

function renderDocument(hero: Section, sections: Section[]): string {
  return (
    "<!DOCTYPE html>" +
    (
      <html lang="en">
        <head>
          <meta charset="utf-8"></meta>
          {makeMeta(kvs)}
          <link rel="stylesheet" href="./all.css" />
          <script defer="" src="./all.js" />
          {process.env.NODE_ENV === "production" ? "" : liveReload}
          <title>{`${config.sitename} - ${config.description}`}</title>
        </head>
        <body class="flex flex-col bg-gray-100 xl:flex-row">
          <div id="page-top"></div>
          {renderNav(sections)}
          <main class="flex-grow navbar-margin-top xl:navbar-margin-left">
            {hero.content}
            <div class="space-y-12 md:space-y-20">
              {sections.map((s) => s.content)}
            </div>
          </main>
        </body>
      </html>
    )
  );
}

let args = process.argv.slice(2);
if (args.length != 1) {
  console.error(`usage: ${process.argv.slice(0, 2).join(" ")} <output file>`);
  process.exit(1);
}

const sections = [progress, timeline];
writeFileSync(args[0], renderDocument(hero, sections));
