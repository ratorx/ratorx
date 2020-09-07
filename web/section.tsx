import * as elements from "typed-html";

export interface Section {
  id: string;
  content: string;
}

export interface Simple {
  id: string;
  title: string;
  body: string;
  maxWidth?: string;
}

export function makeSection(simple: Simple): Section {
  return {
    id: simple.id,
    content: (
      <section
        class={`relative ${
          simple.maxWidth !== undefined ? simple.maxWidth : "max-w-5xl"
        } px-8 pt-4 mx-auto lg:px-12 section`}
      >
        <div id={simple.id} class="p-2 navbar-anchor xl:no-navbar-anchor">
          &nbsp;
        </div>
        <h1 class="mb-4 text-3xl font-medium leading-none tracking-wide text-center sm:text-4xl sm:mb-10">
          {simple.title}
        </h1>
        {simple.body}
      </section>
    ),
  };
}
