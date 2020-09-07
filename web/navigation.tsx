import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { config } from "content";
import * as elements from "typed-html";

export interface Item {
  id: string;
  title?: string;
}

export function renderNav(items: Item[]): string {
  return (
    (
      <header
        id="navbar"
        class="fixed top-0 left-0 z-10 w-screen px-2 py-1 text-gray-200 bg-blue-800 shadow-md sm:flex sm:justify-between sm:items-center sm:p-2 lg:p-3 xl:px-8 xl:py-6 xl:w-auto xl:h-screen xl:shadow-2xl xl:flex-col xl:justify-start"
      >
        <div class="flex items-center justify-between">
          <a
            class="p-1 text-2xl font-bold leading-none tracking-wider uppercase lg:text-3xl hover:text-gray-60 rounded-md"
            href="#page-top"
          >
            {config.sitename}
          </a>
          <button
            id="navopenbutton"
            class="w-8 h-8 p-1 m-1 leading-none border-2 rounded nav-button sm:hidden"
            onclick="openNav()"
            aria-label="Open navigation menu"
            type="button"
          >
            {icon(faBars).html}
          </button>
          <button
            id="navclosebutton"
            class="hidden w-8 h-8 p-1 m-1 leading-none rounded sm:hidden nav-button"
            onclick="closeNav(); setNavbarOffset()"
            aria-label="Close navigation menu"
            type="button"
          >
            {icon(faTimes).html}
          </button>
        </div>
        <nav class="items-center justify-between hidden pt-2 pb-1 text-base tracking-wide border-t-2 border-white lg:text-xl sm:block space-y-2 sm:space-y-0 sm:space-x-1 md:space-x-2 sm:border-t-0 xl:flex-grow xl:flex xl:justify-center xl:flex-col xl:space-x-0 xl:space-y-2">
          {items.map((item: Item) => (
            <a
              class="block px-1 py-2 leading-none tracking-wide capitalize sm:inline-block sm:p-2 nav-button rounded-md"
              href={`#${item.id}`}
              onclick="closeNav()"
              title={item.title !== undefined ? item.title : item.id}
            >
              {item.id}
            </a>
          ))}
        </nav>
      </header>
    ) +
    (
      <script>
        {`function setNavbarOffset() {
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
        setNavbarOffset();`}
      </script>
    )
  );
}
