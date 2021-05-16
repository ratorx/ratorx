const esbuild = require("esbuild");

const preactCompatPlugin = {
  name: "preact-compat",
  setup(build) {
      const path = require("path");
      const preact = path.join(process.cwd(), "node_modules", "preact", "compat", "dist", "compat.module.js");

      build.onResolve({filter: /^(react-dom|react)$/}, args => {
          return {path: preact};
      });
  }
}

const configs = {
  "web/index.tsx": {
    entryPoints: ["web/index.tsx"],
    platform: "node",
    bundle: true,
    jsxFactory: "preact.h",
    jsxFragment: "preact.Fragment",
    inject: ["static/web/js/jsx-shim.js"],
    plugins: [preactCompatPlugin],
    outdir: "build/gen/web"
  },
  "utils/cmd/readme.ts": {
    entryPoints: ["utils/cmd/readme.ts"],
    platform: "node",
    bundle: true,
    outdir: "build/gen/utils/cmd"
  }
}

Object.entries(configs) .map(([_, config]) => esbuild
  .build(config)
  .catch((e) => console.error(e.message)));