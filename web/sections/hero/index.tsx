import { icon } from "@fortawesome/fontawesome-svg-core";
import { config } from "content";
import * as link from "content/link";
import * as elements from "typed-html";
import { renderTaglineSection } from "./tagline";

function makeLinks(): string {
  const f = (link: link.Link) => (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      class="block text-gray-200 bg-gray-600 rounded-full shadow-lg hover:bg-gray-500 active:bg-gray-700 icon"
      title={link.name}
    >
      {icon(link.icon).html}
    </a>
  );
  return (
    <address class="flex space-x-3 md:space-x-4">
      {Object.values(link.data).map(f)}
    </address>
  );
}

const id = "hero";

const hero = {
  id: id,
  content: (
    <section class="flex items-center justify-center py-16 xl:h-screen sm:py-24 md:py-32 lg:py-48">
      <div class="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12">
        <h1
          class="text-3xl font-bold tracking-wider text-gray-900 uppercase sm:text-5xl md:text-6xl comfortaa"
          style="text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5)"
        >
          {`${config.first} ${config.last}`}
        </h1>
        {renderTaglineSection()}
        {makeLinks()}
      </div>
    </section>
  ),
};

export default hero;
