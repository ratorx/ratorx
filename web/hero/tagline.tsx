import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeURL, OLC } from "utils/location";
import { nbsp } from "utils/specialchars";

interface PrefixedLink {
  prefix: string;
  content: string;
}

interface SwitchButtonDisplay {
  mobileButton: IconDefinition;
  mainButton: string;
}

interface CoreDisplay {
  linkID: string;
  main: PrefixedLink;
  mobile: string;
}

interface LocationDisplay {
  code: OLC;
  link: PrefixedLink;
}

export interface TaglineProps {
  button: SwitchButtonDisplay;
  core: CoreDisplay;
  location: LocationDisplay;
  isPrimary: boolean;
}

// TODO: Refactor
// This is much more complicated than it needs to be...
// Consider using an inner div to toggle between the mobile and non-mobile
// versions.
const Tagline = (tagline: TaglineProps) => {
  const f = (b: boolean) => (b ? "primarytagline" : "secondarytagline");
  const id = f(tagline.isPrimary);
  const other = f(!tagline.isPrimary);
  return (
    <div
      id={id}
      className={`flex items-center justify-start text-base sm:text-xl space-x-2 sm:space-x-3 md:space-x-0 ${
        tagline.isPrimary ? "" : "hidden"
      }`}
    >
      <button
        className="rounded-full md:w-auto md:h-auto md:p-1 md:rounded icon primary-button"
        click={`switchElements("${other}", "${id}")`}
        aria-label={`Switch to the ${
          tagline.isPrimary ? "secondary" : "primary"
        } tagline`}
        type="button"
      >
        <span className="md:hidden">
          <FontAwesomeIcon icon={tagline.button.mobileButton} />
        </span>
        <span className="hidden md:inline">{tagline.button.mainButton}</span>
      </button>
      <p className="md:hidden">
        {tagline.core.mobile}
        <span className="select-none">{nbsp}</span>
      </p>
      <span className="hidden md:inline">
        {`${nbsp}${tagline.core.main.prefix} `}
        <a
          className="inline-block p-1 rounded secondary-button"
          title="Link to timeline entry"
          href={`#${tagline.core.linkID}`}
        >
          {tagline.core.main.content}
        </a>
      </span>
      <span className="hidden md:inline">
        {`${nbsp}${tagline.location.link.prefix} `}
        <a
          className="inline-block p-1 rounded tertiary-button"
          href={makeURL(tagline.location.code)}
          target="_blank"
          rel="noopener noreferrer"
          title="Open location in Google Maps"
        >
          {tagline.location.link.content}
        </a>
      </span>
    </div>
  );
};

export type TaglineSectionProps = {
  primary: Omit<TaglineProps, "isPrimary">;
  secondary: Omit<TaglineProps, "isPrimary">;
};

export const TaglineSection = (props: TaglineSectionProps) => (
  <>
    <Tagline {...props.primary} isPrimary={true} />
    <Tagline {...props.secondary} isPrimary={false} />
  </>
);
