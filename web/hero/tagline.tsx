import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeURL, OLC } from "utils/location";
import { nbsp } from "utils/specialchars";

type SwitchButtonProps = {
  id: string;
  otherID: string;
  isPrimary: boolean;
  mobileIcon: IconDefinition;
};

const SwitchButton: preact.FunctionalComponent<SwitchButtonProps> = (props) => (
  <button
    className="rounded-full md:w-auto md:h-auto md:p-1 md:rounded icon primary-button"
    onclick={`switchElements("${props.otherID}", "${props.id}")`}
    aria-label={`Switch to the ${
      props.isPrimary ? "secondary" : "primary"
    } tagline`}
    type="button"
  >
    <span className="md:hidden">
      <FontAwesomeIcon icon={props.mobileIcon} />
    </span>
    <span className="hidden md:inline">{props.children}</span>
  </button>
);

type PrefixedProps = {
  prefix: string;
};

const Prefixed: preact.FunctionalComponent<PrefixedProps> = (props) => (
  <>
    {nbsp}
    {props.prefix} {props.children}
  </>
);

type RoleLinkProps = {
  prefix: string;
  entryID: string;
};

const RoleLink: preact.FunctionalComponent<RoleLinkProps> = (props) => (
  <Prefixed prefix={props.prefix}>
    <a
      className="inline-block p-1 rounded secondary-button"
      title="Link to timeline entry"
      href={`#${props.entryID}`}
    >
      {props.children}
    </a>
  </Prefixed>
);

type LocationLinkProps = {
  prefix: string;
  location: OLC;
};

const LocationLink: preact.FunctionalComponent<LocationLinkProps> = (props) => (
  <Prefixed prefix={props.prefix}>
    <a
      className="inline-block p-1 rounded tertiary-button"
      href={makeURL(props.location)}
      target="_blank"
      rel="noopener noreferrer"
      title="Open location in Google Maps"
    >
      {props.children}
    </a>
  </Prefixed>
);

type ResponsiveContentProps = {
  mobile: string;
};

const ResponsiveContent: preact.FunctionalComponent<ResponsiveContentProps> = (props) => (
  <>
    <p className="md:hidden">
      {props.mobile}
      <span className="select-none">{nbsp}</span>
    </p>
    <p className="hidden md:inline">{props.children}</p>
  </>
);

export type TaglineProps = {
  isPrimary: boolean;

  mobileButtonIcon: IconDefinition;
  mobileText: string;

  buttonText: string;

  rolePrefix: string;
  role: string;
  roleLinkID: string;

  locationPrefix: string;
  locationName: string;
  locationCode: OLC;
};

const Tagline = (props: TaglineProps) => {
  const f = (b: boolean) => (b ? "primarytagline" : "secondarytagline");
  const id = f(props.isPrimary);
  const other = f(!props.isPrimary);
  return (
    <div
      id={id}
      className={`flex items-center justify-start text-base sm:text-xl space-x-2 sm:space-x-3 md:space-x-0 ${
        props.isPrimary ? "" : "hidden"
      }`}
    >
      <SwitchButton
        id={id}
        otherID={other}
        isPrimary={props.isPrimary}
        mobileIcon={props.mobileButtonIcon}
      >
        {props.buttonText}
      </SwitchButton>
      <ResponsiveContent mobile={props.mobileText}>
        <RoleLink prefix={props.rolePrefix} entryID={props.roleLinkID}>
          {props.role}
        </RoleLink>
        <LocationLink
          prefix={props.locationPrefix}
          location={props.locationCode}
        >
          {props.locationName}
        </LocationLink>
      </ResponsiveContent>
    </div>
  );
};

export type FullTaglineProps = {
  primary: Omit<TaglineProps, "isPrimary">;
  secondary: Omit<TaglineProps, "isPrimary">;
};

export const FullTagline = (props: FullTaglineProps) => (
  <>
    <Tagline {...props.primary} isPrimary={true} />
    <Tagline {...props.secondary} isPrimary={false} />
  </>
);
