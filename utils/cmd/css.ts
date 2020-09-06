//@ts-ignore
import { readFile, writeFile } from "fs";
import postcss from "postcss";

let args = process.argv.slice(2);
if (args.length != 2) {
  console.error(
    `usage: ${process.argv
      .slice(0, 2)
      .join(" ")} <input css file> <output file>`
  );
  process.exit(1);
}

let src = args[0];
let dest = args[1];

const base_modules = [
  require("postcss-import"),
  require("tailwindcss")("static/web/css/tailwind.config.js"),
];

const production_modules = () => [
  require("@fullhuman/postcss-purgecss")({
    content: ["./build/public/web/*.html", "./build/public/web/*.js"],

    // This is the function used to extract class names from your templates
    defaultExtractor: (content: string) => {
      // Capture as liberally as possible, including things like `h-(screen-1.5)`
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

      // Capture classes within other delimiters like .block(class="w-1/2") in Pug
      const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

      return broadMatches.concat(innerMatches);
    },
  }),
];

readFile(src, (_, css) => {
  postcss([
    ...base_modules,
    ...(process.env.NODE_ENV === "production" ? production_modules() : []),
  ])
    .process(css, { from: src, to: dest })
    .then((result) => {
      writeFile(dest, result.css, () => true);
      if (result.map) {
        writeFile(`${dest}.map`, result.map.toString(), () => true);
      }
    });
});
