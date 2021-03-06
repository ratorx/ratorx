import { Props as BarProps, Responsive } from "./bar";
import { skillGroups } from "./data";

export type GroupProps = {
  name: string;
  bars: BarProps[];
  isLeft?: boolean;
};

const Group = (props: GroupProps) => (
  <section
    // Apply padding to the left or right when using dual-column view
    className={`w-full lg:w-1/2 ${
      props.isLeft ? "lg:pr-6 xl:pr-12" : "lg:pl-6 xl:pl-12"
    }`}
  >
    <h2 className="tracking-tight text-gray-700 uppercase">{props.name}</h2>
    <ul className="mt-1 space-y-2 text-sm md:text-base">
      {props.bars.map((bar) => (
        <li key={bar.name}>
          <Responsive {...bar} />
        </li>
      ))}
    </ul>
  </section>
);

export type ProgressProps = {
  id: string;
  title: string;
  groups: Omit<GroupProps, "isLeft">[];
};

export const Progress = (_: {}) => (
  <div className="flex flex-wrap max-w-2xl m-auto space-y-4 lg:max-w-none lg:space-y-0 lg:divide-x">
    {skillGroups.map((group, index) => (
      <Group key={group.name} {...group} isLeft={index % 2 == 0} />
    ))}
  </div>
);
