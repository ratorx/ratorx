import { config } from "content";
import * as elements from "typed-html";
import about from "./about";
import { writeFileSync } from "fs";

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

const liveReload = (
  <script type="text/javascript" src="http://livejs.com/live.js"></script>
);

const document =
  "<!DOCTYPE html>" +
  (
    <html lang="en">
      <head>
        <meta charset="utf-8"></meta>
        {makeMeta(kvs)}
        <link rel="stylesheet" href="./all.css" />
        <script defer="" src="./all.js" />
        {process.env.NODE_ENV === "production" ? "" : liveReload}
        <title>
          {config.sitename} - {config.description}
        </title>
      </head>
      <body class="flex flex-col bg-gray-100 xl:flex-row">
        <div id="page-top"></div>
        <main class="flex-grow">{about.content}</main>
      </body>
    </html>
  );

let args = process.argv.slice(2);
if (args.length != 1) {
  console.error(`usage: ${process.argv.slice(0, 2).join(" ")} <output file>`);
  process.exit(1);
}

writeFileSync(args[0], document);
