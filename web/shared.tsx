import { config } from "content";
import { nbsp } from "utils/specialchars";
import { Navbar, NavLink } from "./navbar";

export interface PageProps {
  description: string;
  title: string;
};

export const Page: preact.FunctionalComponent<PageProps> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <meta name="author" content={`${config.first} ${config.last}`} />
        <link rel="stylesheet" href="/all.css" />
        <script defer src="/all.js" />
        <title>{props.title}</title>
      </head>
      <body className="flex flex-col bg-gray-50 xl:flex-row">
        <div id="page-top"></div>
        <Navbar title={config.sitename}>
          <NavLink id="blog" />
          <NavLink id="resume" />
        </Navbar>
        {props.children}
      </body>
    </html>
  );
};

export const Anchor = ({ id }: { id: string }) => (
  <div id={id} className="navbar-anchor xl:no-navbar-anchor">
    {nbsp}
  </div>
);