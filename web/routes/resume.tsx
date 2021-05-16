import { config } from "content";
import { capitalize } from "utils/misc";
import { Progress } from "../progress";
import { Anchor, Page } from "../shared";
import { Timeline } from "../timeline";

interface SectionProps {
  id: string;
  title?: string;
}

const AnchoredSection: preact.FunctionalComponent<SectionProps> = (props) => (
  <section className="relative max-w-5xl px-8 pt-4 mx-auto lg:px-12 section">
    <Anchor id={props.id} />
    <h1 className="mb-4 text-3xl font-medium leading-none tracking-wide text-center sm:text-4xl sm:mb-10">
      {props.title || capitalize(props.id)}
    </h1>
    {props.children}
  </section>
);

export const Resume = () => {
  return (
    <Page
      description={`${config.first}'s resume AS A WEBSITE. A never-before-seen, original idea that I thought of all by myself.`}
      title={`${config.first}'s Online Resume`}
    >
      <main className="flex-grow space-y-12 navbar-margin-top xl:navbar-margin-left md:space-y-20 xl:pt-2">
        <AnchoredSection id="skills">
          <Progress />
        </AnchoredSection>
        <AnchoredSection id="experience" title="Experience & Education">
          <Timeline />
        </AnchoredSection>
      </main>
    </Page>
  );
};
