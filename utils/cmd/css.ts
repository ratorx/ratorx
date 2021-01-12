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

readFile(src, (_, css) => {
  postcss(base_modules)
    .process(css, { from: src, to: dest })
    .then((result) => {
      writeFile(dest, result.css, () => true);
      if (result.map) {
        writeFile(`${dest}.map`, result.map.toString(), () => true);
      }
    });
});
