import { config } from "content";
import { writeFileSync } from "fs";
import render from "preact-render-to-string";
import { capitalize } from "utils/misc";
import { Hero } from "./hero";
import { Navbar, NavLink } from "./navbar";
import { Progress } from "./progress";
import { Anchor } from "./shared";
import { Timeline } from "./timeline";

declare module "preact" {
  interface Attributes {
    onclick?: string;
  }
}

interface SectionProps {
  id: string;
  title?: string;
}

const AnchoredSection: preact.FunctionalComponent<SectionProps> = (props) => (
  <section className="relative max-w-5xl px-8 pt-4 mx-auto lg:px-12 section">
    <Anchor id={props.id} />
    <h1 className="mb-4 text-3xl font-medium leading-none tracking-wide text-center sm:text-4xl sm:mb-10">
      {props.title || capitalize(props.id)}
    </h1>
    {props.children}
  </section>
);

type PageSection = {
  id: string;
  title?: string;
  content: preact.VNode;
};

type PageProps = {
  sections: PageSection[];
};

const Page: preact.FunctionalComponent<PageProps> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={config.description} />
        <meta name="author" content={[config.first, config.last].join(" ")} />
        <link rel="stylesheet" href="./all.css" />
        <script defer src="./all.js" />
        <title>{`${config.sitename} - ${config.description}`}</title>
      </head>
      <body className="flex flex-col bg-gray-50 xl:flex-row">
        <div id="page-top"></div>
        <Navbar title={config.sitename}>
          <NavLink id="skills" title="Skills" />
          <NavLink id="experience" title="Experience" />
        </Navbar>
        <main className="flex-grow navbar-margin-top xl:navbar-margin-left">
          <Hero />
          <div className="space-y-12 md:space-y-20">
            {props.sections.map((section) => (
              <AnchoredSection key={section.id} {...section}>
                {section.content}
              </AnchoredSection>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
};

let args = process.argv.slice(2);
if (args.length != 1) {
  console.error(`usage: ${process.argv.slice(0, 2).join(" ")} <output file>`);
  process.exit(1);
}

writeFileSync(
  args[0],
  "<!DOCTYPE html>" +
    render(
      <Page
        sections={[
          { id: "skills", content: <Progress /> },
          {
            id: "experience",
            title: "Experience & Education",
            content: <Timeline />,
          },
        ]}
      />
    )
);
