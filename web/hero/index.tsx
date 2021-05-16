import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "content";
import * as link from "content/link";
import { FullTagline } from "web/hero/tagline";
import { fullTaglineProps } from "./data";

const Link = (props: link.Link) => (
  <a
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-gray-200 bg-gray-500 rounded-full shadow-lg hover:bg-gray-400 active:bg-gray-600 icon"
    title={props.name}
  >
    <FontAwesomeIcon icon={props.icon} />
  </a>
);

const ContactDetails: preact.FunctionalComponent<{}> = (props) => (
  <address className="flex space-x-3 md:space-x-4">{props.children}</address>
);

export const Hero = (_: {}) => (
  <section className="flex items-center justify-center py-16 xl:h-screen sm:py-24 md:py-32 lg:py-48">
    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12">
      <h1
        className="text-3xl font-bold tracking-wider text-gray-900 uppercase sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ textShadow: "0 2px 3px rgba(0, 0, 0, 0.5" }}
      >
        {`${config.first} ${config.last}`}
      </h1>
      <FullTagline {...fullTaglineProps} />
      <ContactDetails>
        {Object.values(link.data).map((l: link.Link) => (
          <Link key={l.name} {...l} />
        ))}
      </ContactDetails>
    </div>
  </section>
);
