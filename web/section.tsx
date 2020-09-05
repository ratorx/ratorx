import * as elements from "typed-html";

export interface Section {
  id: string;
  title: string;
  content: string;
}

export function render(section: Section): string {
  return (
    <section class="relative max-w-4xl px-8 py-4 mx-auto">
      <a id={section.id} class="p-2 navbar-anchor xl:no-navbar-anchor">
        &nbsp;
      </a>
      <div class="space-y-4 sm:space-y-10">
        <h1 class="text-2xl font-medium leading-none tracking-wide text-center sm:text-3xl xl:text-4xl">
          {section.title}
        </h1>
        {section.content}
      </div>
    </section>
  );
}
