import { config } from "content";
import { Page } from "web/shared";

export const BlogList = () => <Page title={`${config.first}'s (future) blog`} description={`It's a blog with no articles. Enjoy bg-gray-50.`}>
  <main className="flex-grow navbar-margin-top xl:navbar-margin-left">
  <section className="flex items-center justify-center h-screen py-16 sm:py-24 md:py-32 lg:py-48">
    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12">
      <h1
        className="text-3xl font-bold tracking-wider text-gray-900 uppercase sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ textShadow: "0 2px 3px rgba(0, 0, 0, 0.5" }}
      >
        Under Construction
      </h1>
    </div>
  </section>
  </main>
</Page>