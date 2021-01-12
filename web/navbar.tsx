import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavButton: React.FC<React.ComponentProps<"button">> = (props) => {
  const { className = "", ...otherProps } = props;
  return (
    <button
      className={`w-8 h-8 p-1 m-1 leading-none border-2 rounded nav-button sm:hidden ${className}`}
      {...otherProps}
    >
      {props.children}
    </button>
  );
};

const NavOpenButton = (_: {}) => (
  <NavButton
    id="navopenbutton"
    click="openNav()"
    aria-label="Open navigation menu"
    type="button"
  >
    <FontAwesomeIcon icon={faBars} />
  </NavButton>
);

const NavCloseButton = (_: {}) => (
  <NavButton
    id="navclosebutton"
    className="hidden"
    click="closeNav(); setNavbarOffset()"
    aria-label="Close navigation menu"
    type="button"
  >
    <FontAwesomeIcon icon={faTimes} />
  </NavButton>
);

export type NavLinkProps = {
  id: string;
  title: string;
};

export const NavLink = (props: NavLinkProps) => (
  <a
    key={props.id}
    className="block px-1 py-2 leading-none tracking-wide capitalize rounded-md sm:inline-block sm:p-2 nav-button"
    href={`#${props.id}`}
    click="closeNav()"
    title={props.title}
  >
    {props.title}
  </a>
);

export type NavbarProps = {
  title: string;
};

export const Navbar: React.FC<NavbarProps> = (props) => (
  <>
    <header
      id="navbar"
      className="fixed top-0 left-0 z-10 w-screen px-2 py-1 text-gray-200 bg-blue-800 shadow-md sm:flex sm:justify-between sm:items-center sm:p-2 lg:p-3 xl:px-8 xl:py-6 xl:w-auto xl:h-screen xl:shadow-2xl xl:flex-col xl:justify-start"
    >
      <div className="flex items-center justify-between">
        <a
          className="p-1 text-2xl font-bold leading-none tracking-wider uppercase rounded-md lg:text-3xl hover:text-gray-60"
          href="#page-top"
        >
          {props.title}
        </a>
        <NavOpenButton />
        <NavCloseButton />
      </div>
      <nav className="items-center justify-between hidden pt-2 pb-1 space-y-2 text-base tracking-wide border-t-2 border-white lg:text-xl sm:block sm:space-y-0 sm:space-x-1 md:space-x-2 sm:border-t-0 xl:flex-grow xl:flex xl:justify-center xl:flex-col xl:space-x-0 xl:space-y-2">
        {props.children}
      </nav>
    </header>
    <script
      dangerouslySetInnerHTML={{
        __html: `function setNavbarOffset() {
          let body = document.body.style;
          let nav = document.getElementById('navbar')
          let height = nav.offsetHeight;
          let width = nav.offsetWidth;
          if (width === window.innerWidth) {
            body.setProperty('--navbar-offset', -height + "px");
          } else {
            body.setProperty('--navbar-offset', -width + "px");
          }
        }
        setNavbarOffset();`,
      }}
    />
  </>
);
