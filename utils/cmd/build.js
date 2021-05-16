const esbuild = require("esbuild");

const configs = {
  "web/index.tsx": {
    entryPoints: ["web/index.tsx"],
    platform: "node",
    bundle: true,
    inject: ["static/web/js/react-shim.js"],
    outdir: "build/gen/web"
  },
  "utils/cmd/readme.ts": {
    entryPoints: ["utils/cmd/readme.ts"],
    platform: "node",
    bundle: true,
    outdir: "build/gen/"
  }
}

Object.entries(configs) .map(([_, config]) => esbuild
  .build(config)
  .catch((e) => console.error(e.message)));